<?php

namespace App\Jobs;

use App\Mail\CakeAvailableMail;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendCakeNotificationEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public string $email;
    public string $cakeName;

    public function __construct(string $email, string $cakeName)
    {
        $this->email = $email;
        $this->cakeName = $cakeName;
    }

    public function handle(): void
    {
        Mail::to($this->email)->send(new CakeAvailableMail($this->cakeName));
    }
}

