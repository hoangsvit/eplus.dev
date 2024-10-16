---
title: "Open Server Panel 6 Beta"
seoTitle: "Open Server Panel 6 Beta"
seoDescription: "The best tool for local development of websites and web services on the Windows platform."
datePublished: Wed Aug 09 2023 16:04:26 GMT+0000 (Coordinated Universal Time)
cuid: cll3x7tse000909iegghuc37e
slug: open-server-panel-6-beta
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1691596959698/da8f6ec8-c813-4615-a262-e10b799e6d93.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1691597046905/d34a78d9-8a63-4080-b8fa-7d61a16c3af8.png

---

The best tool for local development of websites and web services on the Windows platform.

We present to you a software environment for web developers, which includes a set of server software (WAMP-stack), as well as a simple and convenient control panel in two versions: a web interface and a command line interface (CLI).

Today, Open Server Panel is widely used for the development, debugging and testing of web projects, as well as for providing web services in local networks. The project has gained great popularity among novice web developers, as it allows you to quickly deploy a working environment and immediately begin learning web technologies without complex manipulations for installing and configuring a large number of various programs.

**Features**

* Unobtrusive work in the Windows tray
    
* Multilingual interface
    
* Support portable operation mode
    
* Full user access to module settings and configurations
    
* Program management in console mode and via the web interface
    
* Full control over processes (including monitoring and recovery after a failure)
    
* The possibility of parallel operation of any modules (you can turn on at least all at the same time)
    
* Easy domain management with support for internationalized domains and domain pseudomains (aliases)
    
* A huge set of third-party PHP extensions
    
* SSL and IPv6 support without additional configuration
    
* The ability to quickly change the current environment in the console with one command
    
* Ability to create module configuration profiles (including module configuration files)
    
* Personalization of settings for each domain (from IP to PHP version)
    
* A pre-configured environment for each module (up to entering the shell/cli with one command)
    
* Punycode domain name converter
    
* and much more...
    

[Documentation](https://github.com/OSPanel/OpenServerPanel/wiki/Home)

## Command Line Interface

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1691596765918/7053f5fb-28ae-4c15-957c-5cdd06c72638.png align="center")

Лучший инструмент для локальной разработки веб-сайтов и веб-сервисов на платформе Windows.

Представляем вам программную среду для веб-разработчиков, включающую в себя набор серверного программного обеспечения ([WAMP](https://ru.wikipedia.org/wiki/WAMP)\-cтек), а также простую и удобную панель управления в двух вариантах: веб-интерфейс и интерфейс командной строки (CLI).

На сегодняшний день Open Server Panel широко используется с целью разработки, отладки и тестирования веб-проектов, а также для предоставления веб-сервисов в локальных сетях. Проект завоевал большую популярность у начинающих веб-разработчиков, так как позволяет быстро развернуть рабочую среду и сразу начать изучение веб-технологий без сложных манипуляций по установке и настройке большого количества разнообразных программ.

**Возможности**

* Незаметная работа в трее Windows
    
* Мультиязычный интерфейс
    
* Поддержка портативного режима работы
    
* Полный доступ пользователя к настройкам и конфигурации модулей
    
* Управление программой в консольном режиме и через веб-интерфейс
    
* Полный контроль над процессами (включая мониторинг и восстановление после сбоя)
    
* Возможность параллельной работы любых модулей (можно включить хоть все одновременно)
    
* Простое управление доменами с поддержкой интернационализованных доменов и доменных псевдоминов (алиасов)
    
* Огромный набор сторонних расширений PHP
    
* Поддержка SSL и IPv6 без дополнительной настройки
    
* Возможность быстрой смены текущей среды в консоли одной командой
    
* Возможность создавать профили настроек модулей (включая файлы конфигурации модулей)
    
* Персонализация настроек для каждого домена (от IP до версии PHP)
    
* Преднастроенная среда для каждого модуля (вплоть до входа в shell/cli одной командой)
    
* Punycode конвертер доменных имён
    
* и многое другое...
    

[Документация](https://github.com/OSPanel/OpenServerPanel/wiki/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F) | [Telegram](https://t.me/ospanel_chat)

## Интерфейс командной строки

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1691596850193/6452831c-4aa3-4692-9f8c-c37e69c7b081.png align="center")

---

## **6.0.0.510-beta**

**What's new**

* The ability to uninstall
    
* Ability to choose the type of installation (conventional or portable)
    
* Checking important registry settings at the start of the program
    

**Changes**

* The `temp` and `data` directories are now different for each settings profile
    
* The `osp initssl` command has been replaced with `osp ssl init`
    
* The installer will now not allow you to install another copy of the program of the same version
    
* Additional installation of modules is now possible only in the directory where the current version is already installed
    
* Directory `.\user\blackfire` moved to `.\data\<php_module_name>\<profile_name>\blackfire`
    
* In the logs, along with the module name, the name of the current module profile is now indicated if the `log_write_title` option is enabled
    
* Template variable `{module_profile_name}` in `menu.ini` has been replaced with `{profile_name}`
    

**Corrections**

* Some menu items were displayed when they shouldn't
    
* Removed the dark menu theme due to visual artifacts and other issues
    

**Important!**

* Do not install on top of the old version!
    
* Use the `osp sysprep` and `osp ssl init` commands if you accidentally missed these steps during the installation phase!
    
* Read the updated user guide on GitHub!
    

**Checksums**

```markdown
    MD5: E68C65EE1D824BCD8065EC4D6E1C232C
  SHA-1: 23FBBDFC74184C6F5AFE28AF9043DB485153DC8E
SHA-256: FB9A8C57772601222B13CD3DD0EF33059E30C07EE89F128484737C040B5F4303
```

The date after which the mandatory update will be required: **01 Oct 2023 18:00:00 (UTC+3)**

**Download (1.01 GB):** [RU](https://files.ospanel.io/ospanel_setup_6_0_0_510.exe) | [NL](https://eu.ospanel.io/ospanel_setup_6_0_0_510.exe) | [US](https://us.ospanel.io/ospanel_setup_6_0_0_510.exe) ← choose the closest server to your location

---

**Что нового**

* Возможность деинсталляции
    
* Возможность выбрать тип установки (обычная или портативная)
    
* Проверка важных параметров реестра при старте программы
    

**Изменения**

* Каталоги `temp` и `data` теперь различны для каждого профиля настроек
    
* Команда `osp initssl` заменена на `osp ssl init`
    
* Инсталлятор теперь не позволит установить ещё одну копию программы одной и той же версии
    
* Доустановка модулей теперь возможна только в каталог где уже установлена текущая версия
    
* Каталог `.\user\blackfire` перемещён в `.\data\<имя_модуля_PHP>\<имя_профиля>\blackfire`
    
* В журналах вместе с именем модуля теперь указывается и имя текущего профиля модуля если включена опция `log_write_title`
    
* Шаблонная переменная `{module_profile_name}` в `menu.ini` заменена на `{profile_name}`
    

**Исправления**

* Некоторые пункты меню отображались когда не должны
    
* Удалена тёмная тема оформления меню из-за визуальных артефактов и других проблем
    

**Важно!**

* Не производите установку поверх старой версии!
    
* Используйте команды `osp sysprep` и `osp ssl init` если вы случайно пропустили эти шаги на этапе установки!
    
* Прочитайте обновлённое руководство пользователя на GitHub!
    

**Контрольные суммы**

```markdown
    MD5: E68C65EE1D824BCD8065EC4D6E1C232C
  SHA-1: 23FBBDFC74184C6F5AFE28AF9043DB485153DC8E
SHA-256: FB9A8C57772601222B13CD3DD0EF33059E30C07EE89F128484737C040B5F4303
```

Дата, после которой потребуется обязательное обновление: **01 октября 2023 18:00:00 (UTC+3)**

**Скачать (1.01 ГБ):** [RU](https://files.ospanel.io/ospanel_setup_6_0_0_510.exe) | [NL](https://eu.ospanel.io/ospanel_setup_6_0_0_510.exe) | [US](https://us.ospanel.io/ospanel_setup_6_0_0_510.exe) ← выберите ближайший сервер к вашему местоположению