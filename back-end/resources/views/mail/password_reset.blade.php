<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trocar Senha</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #333333;
        }
        .content {
            margin-top: 20px;
            font-size: 16px;
            line-height: 1.5;
        }
        .button-container {
            margin-top: 30px;
            text-align: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4caf50;
            color: #ffffff;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 4px;
        }
        .button:hover {
            background-color: #45a049;
        }
        .footer {
            margin-top: 40px;
            font-size: 14px;
            text-align: center;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">Solicitação de Troca de Senha</div>
        <div class="content">
            Olá,<br><br>
            Recebemos a sua solicitação de troca de senha. Após 10 minutos, a solicitação abaixo se tornará inválida. Clique no botão abaixo para redefini-la:
        </div>
        <div class="button-container">
            <a
                href="{{ 'http://' . env('SANCTUM_STATEFUL_DOMAINS') . '/password-reset/' . $token }}"
                class="button"
            >
                Trocar Senha
            </a>
        </div>
        <div class="footer">
            Caso não tenha solicitado esta troca de senha, ignore este e-mail.
        </div>
    </div>
</body>
</html>
