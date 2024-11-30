<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova Postagem</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f8f9fa;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            font-size: 24px;
            margin: 0;
            color: #4caf50;
        }
        .content {
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            text-decoration: none;
            background-color: #4caf50;
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            text-align: center;
        }
        .button:hover {
            background-color: #3d8d40;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Nova Postagem</h1>
        </div>
        <div class="content">
            <p>Uma nova postagem da turma <strong>{{ $post->classe->course->name  }} {{ $post->classe->year }} - {{ $post->classe->name }}</strong> foi feita.</p>
        </div>
        <div>
            <a href="{{ 'http://' . env('SANCTUM_STATEFUL_DOMAINS') . '/classes/' . $post->classe->id }}" class="button">Ver Turma</a>
        </div>
        <div class="footer">
            <p>Obrigado por usar nosso sistema.</p>
        </div>
    </div>
</body>
</html>
