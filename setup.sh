#!/bin/bash



GREEN='\0033[0;32m'

YELLOW='\0033[1;33m'

RED='\0033[0;31m'

NC='\0033[0m'



echo -e "${GREEN}=======================================${NC}"

echo -e "${GREEN}  Student Opportunity System (SOS)    ${NC}"

echo -e "${GREEN}           Setup Script                ${NC}"

echo -e "${GREEN}=======================================${NC}"



# 1.  (Laravel)

echo -e "\n${YELLOW}[1/2] Setting up Backend (Laravel)...${NC}"

if [ -d "backend" ]; then

    cd backend || exit

    

    echo -e "Installing Composer dependencies..."

    composer install

    

    if [ ! -f ".env" ]; then

        echo -e "Creating .env file from .env.example..."

        cp .env.example .env

        echo -e "${YELLOW}⚠️  Don't forget to update your DB credentials in backend/.env${NC}"

    else

        echo -e ".env file already exists."

    fi

    

    echo -e "Generating application key..."

    php artisan key:generate

    

    echo -e "Running database migrations..."

    php artisan migrate --seed

    

    cd ..

else

    echo -e "${RED}❌ Error: 'backend' directory not found!${NC}"

fi



# 2.  (React + TypeScript)

echo -e "\n${YELLOW}[2/2] Setting up Frontend (React + TypeScript)...${NC}"

if [ -d "frontend" ]; then

    cd frontend || exit

    

    echo -e "Installing npm packages..."

    npm install

    

    cd ..

else

    echo -e "${RED}❌ Error: 'frontend' directory not found!${NC}"

fi



echo -e "\n${GREEN}=======================================${NC}"

echo -e "${GREEN}✅ Setup completed successfully!${NC}"

echo -e "To start the project:"

echo -e "1. Backend: cd backend && php artisan serve"

echo -e "2. Frontend: cd frontend && npm run dev"

echo -e "${GREEN}=======================================${NC}"
