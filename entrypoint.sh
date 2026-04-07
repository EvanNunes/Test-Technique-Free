#!/bin/bash
set -e

until php -r "new PDO('pgsql:host=postgres;port=5432;dbname=tech_bd', 'postgres', 'postgres');" 2>/dev/null; do
    sleep 1
done
echo "PostgreSQL prêt."

php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration
php bin/console doctrine:fixtures:load --no-interaction

apache2-foreground
