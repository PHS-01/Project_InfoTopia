<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PasswordResetRequest extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        private string $token
    ) {}

    public function build()
    {
        return $this->subject('InfoTopia - Solicitação de Troca de Senha')
                    ->view('mail.password_reset', [
                        'token' => $this->token,
                    ]);
    }
}
