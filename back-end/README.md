# InfoTopia

## Guia de configuração

### Start

```shell
composer install
```

```shell
php artisan migrate
```

```shell
php artisan key:generate
```

```shell
php artisan storage:link
```

Após rodas os comandos acima, configure o `.env` para as suas configurações desejadas, como banco de dados.

Execute também o comando abaixo após ter configurado o banco de dadaos para definir alguns dados padrão, como o usuário administrador:

```shell
php artisan db:seed
```

### E-mail

A aplicação conta com notificações por e-mail. Para habilitar, é necessário fazer algumas configurações no arquivo `.env`. Para fins de teste e verificação, pode-se utilizar o <a href="https://mailtrap.io">MailTrap</a>. As configurações necessárias são:

```env
MAIL_MAILER=
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=
MAIL_PASSWORD=
```

### Front-end

O projeto possui um front em React que utiliza a autenticação do Laravel Sanctum. Para isso, é preciso fazer as seguintes condigurações no .env

```env
SESSION_DRIVER=cookie
SESSION_DOMAIN='.localhost'
SANCTUM_STATEFUL_DOMAINS='localhost:5173'
```

O usuário administrador criado terá as seguintes credenciais:

```
E-mail: admin@gmail.com
Senha: senhateste
```


## Documentação do Projeto
    
Link do Figma e FigJam
- [Figma InfoTopia](https://www.figma.com/files/project/248499784).
  
Link do Drive
- [Drive InfoTopia](https://drive.google.com/drive/folders/1gz4gHKQBtUSAs0vhRuPbKg7qjEs9mep2?usp=sharing).