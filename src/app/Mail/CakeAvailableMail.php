<?php

namespace App\Mail;

use App\Models\Cake;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CakeAvailableMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $cakeName;

    public function __construct(string $cakeName)
    {
        $this->cakeName = $cakeName;
    }

    public function build()
    {
        return $this->subject('🍰 Bolo disponível!')
                    ->view('emails.cake-available');
    }
}

