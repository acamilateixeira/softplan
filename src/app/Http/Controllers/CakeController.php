<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCakeRequest;
use App\Http\Resources\CakeResource;
use App\Models\Cake;
use App\Models\InterestedEmail;
use Illuminate\Support\Facades\Mail;
use App\Mail\CakeAvailableMail;
use Illuminate\Http\Request;
use App\Jobs\SendCakeNotificationEmail;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CakeController extends Controller
{
    public function index()
    {
        return CakeResource::collection(Cake::with('interestedEmails')->get());
    }

    public function store(StoreCakeRequest $request)
    {
        $cake = Cake::create($request->only(['name', 'weight', 'price', 'quantity']));
    
        foreach ($request->input('emails', []) as $email) {
            InterestedEmail::create([
                'cake_id' => $cake->id,
                'email' => $email,
            ]);
        
            dispatch(new SendCakeNotificationEmail($email, $cake->name));
        }

        return new CakeResource($cake->load('interestedEmails'));
    }

    public function show(Cake $cake)
    {
        return new CakeResource($cake->load('interestedEmails'));
    }

    public function update(StoreCakeRequest $request, Cake $cake)
    {
        $cake->update($request->only(['name', 'weight', 'price', 'quantity']));
        return new CakeResource($cake->refresh()->load('interestedEmails'));
    }

    public function destroy(Cake $cake)
    {
        $cake->delete();
        return response()->json(null, 204);
    }

    public function summary()
    {
        $cakes = Cake::withCount('interestedEmails')->get();
    
        return response()->json([
            'total_cakes' => $cakes->count(),
            'total_quantity' => $cakes->sum('quantity'),
            'by_cake' => $cakes->map(function ($cake) {
                return [
                    'name' => $cake->name,
                    'quantity' => $cake->quantity,
                    'interested' => $cake->interested_emails_count,
                ];
            }),
        ]);
    }
    
    public function export(): StreamedResponse
    {
        $cakes = Cake::with('interestedEmails')->get();
    
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="cakes.csv"',
        ];
    
        $callback = function () use ($cakes) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Nome', 'Peso (g)', 'Valor (R$)', 'Quantidade', 'Emails']);
    
            foreach ($cakes as $cake) {
                fputcsv($handle, [
                    $cake->name,
                    $cake->weight,
                    number_format($cake->price, 2, ',', '.'),
                    $cake->quantity,
                    implode(', ', $cake->interestedEmails->pluck('email')->toArray()),
                ]);
            }
    
            fclose($handle);
        };
    
        return response()->stream($callback, 200, $headers);
    }
}
