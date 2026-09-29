# SistemaBiblioteca-DWII-Fatec

O Sistema de Gestão de Biblioteca é uma aplicação web desenvolvida para o controle de acervos, empréstimos e usuários em bibliotecas. O objetivo principal do projeto é oferecer uma interface intuitiva para leitores e uma ferramenta eficiente de administração para a biblioteca.

---
## Dependências
| Componente | Versão |
|-----------|--------|
| PHP | 8.5.10 |
| Composer | 2.10.3 |
| Npm | 11.19.0 |
| nodeJS | 24.21.0 |
| Docker | 29.8.0 |

---
## Modelagem Utilizada
<img width="1255" height="883" alt="image" src="https://github.com/user-attachments/assets/96ab29ba-356b-4aa3-b355-fe1816a2ffa0" />

---
## Instalação 
1. Dirija se a pasta que você deseja clonar o repositório e use o comando no terminal: **"git clone https://github.com/V0ltzx/SistemaBiblioteca-DWII-Fatec.git"**
      - Para utilizar a build mais recente use o comando: **"git switch dev"**
2. Abra o php.ini do seu computador e habilite as seguintes extensões retirando o ";"
      - **extension=curl**
      - **extension=fileinfo**
      - **extension=intl**
      - **extension=zip**
      - **extension=mbstring**
      - **extension=openssl**
      - **extension=pdopgsql**
      - **extension=pgsql**
3. Para habilitar as pesquisas utilizando a api externa, ainda no php.ini ache **"curl.cainfo="** e **"openssl.cafile="** e coloque o caminho do arquivo **cacert.pem** do seu computador baixado neste link: https://curl.se/ca/cacert.pem
4. No terminal abra a pasta biblioteca-api e use o comando: **"composer install"**
5. Em outro terminal abra a pasta biblioteca-front e use o comando: **"npm install"**
6. Em ambas as pastas do backend e frontend copie o **.env.example** substitua o nome apenas por **.env** e coloque corretamente as credencias de servidor do supabase no .env backend, no frontend a URL do vite
7. No terminal do beckend utilize o comando: **"artisan key:generate"**
8. Rode as migrações das tabelas para o supabase com o comando: **"php artisan migrate"**
9. Para abrir o servidor do laravel abra o terminal do backend e use o comando: **"php artisan serve"**
10. Para abrir o servidor do frontend abra seu terminal e use o comando: **"npm run dev"**
11. Abra o link que aparece no terminal e use 😻😻😻😦😋
