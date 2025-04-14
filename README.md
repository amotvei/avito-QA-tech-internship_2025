# Задание 1
----------------------------------------------
Формулировка: Перед вами скриншот страницы Авито с результатами поиска. Изучите его, перечислите все имеющиеся баги, и укажите их приоритет (high, medium, low).

[Ответ на это задание здесь!](taskOne/BugReport.md)


# Задание 2.1

- Все найденные баги описаны в [BUGS.md](taskTwo/BUGS.md)

- Подробные сценарии тестирования описаны в [TESTCASES.md](taskTwo/TESTCASES.md)

## Структура проекта
```
taskTwo/
├── imgBUGS/                    # Папка для изображений багов
├── test/                       # Основные тестовые файлы
│   ├── test_createItem.js          # Тесты для POST /api/1/item
│   ├── test_deleteItem.js          # Тесты для DELETE /api/2/item/:id
│   ├── test_getItemById.js         # Тесты для GET /api/1/item/:id
│   ├── test_getItemsBySeller.js    # Тесты для GET /api/1/:sellerID/item
│   ├── test_getStatisticById.js    # Тесты для GET /statistic/:id
│
├── BUGS.md                    # Описание найденных багов
├── TESTCASES.md               # Подробное описание тест-кейсов
├──package-lock.json
├──package.json
└── helpers.js             
```
## Предварительные требования
Перед началом работы убедитесь, что у вас установлены:
Node.js версии не ниже 14.x (рекомендуется LTS)
npm — менеджер пакетов Node.js

Проверить установку можно командами:
```
node -v
npm -v
```
Если Node.js не установлен — загрузите и установите его с официального сайта: https://nodejs.org/

1. **Клонирование репозитория**

Откройте терминал и выполните команду:
   ```
    git clone https://github.com/amotvei/avito-QA-tech-internship_2025.git
   ```

2. **Переход в каталог проекта**

Перейдите в директорию проекта:
```
cd avito-QA-tech-internship_2025/taskTwo
```

3. **Установка зависимостей**

В директории проекта запустите следующую команду, чтобы установить все библиотеки, указанные в package.json 
```
npm install
```

4. Запустить тестирование
```
npm test

```
   

