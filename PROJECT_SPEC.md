# Ultimate dApp Scaffold - Project Specification

## Vision
Веб-сервис (SaaS) для генерации production-ready Web3 проектов за 3 клика.
Решает главную боль: сборка и настройка стека (Foundry/Hardhat + фронтенд + кошельки) занимает часы. Этот сервис делает это за секунды.

---

## Core Features

### 1. Template Generator (Базовые шаблоны)
Пользователь выбирает в интерфейсе:

| Категория | Опции |
|-----------|-------|
| **Тип проекта** | NFT Collection, ERC-20 Token, Staking, DAO |
| **Tooling** | Foundry (default) / Hardhat |
| **Extras** | Whitelist, Royalties, Pausable, AccessControl, Upgradeable |

**Output:** ZIP-архив или GitHub repo с:
- Solidity контракты
- Deploy scripts
- Next.js frontend
- RainbowKit/Wagmi подключение кошелька
- Готовые тесты

---

### 2. Cross-Chain Templates (Уникальная фича)
Готовые бойлерплейты для кросс-чейн разработки:

#### A. LayerZero V2 - OFT (Omnichain Fungible Token)
- Токен, который нативно существует на нескольких сетях
- Настроенный `setPeers` для связи сетей
- Скрипты для отправки токенов между chains

#### B. Chainlink CCIP - Cross-Chain Messaging
- Sender + Receiver контракты
- Настроенные роутеры для testnets (Sepolia, Fuji)
- Скрипт пополнения LINK для оплаты газа

#### C. Wormhole - EVM <-> Solana Bridge
- Уникальная фича: связь EVM и Solana экосистем
- Готовые контракты для обеих сторон

---

### 3. GlassUI for Web3 (Design System)
Кастомная UI библиотека в комплекте с каждым сгенерированным проектом:

- **Стиль:** Black/Purple + Liquid Glass эффекты
- **Компоненты:** Кнопки, инпуты, карточки, модалки
- **Отличие от конкурентов:** Не скучный OpenZeppelin Wizard, а стильный продукт

---

### 4. AI Integration
- Кнопка "Explain Code" в интерфейсе
- Автогенерация README.md с объяснением как запустить проект
- Под капотом: n8n/Gemini API

---

## Tech Stack

### Сам сервис (генератор)
```
Frontend:     Next.js 14 + TypeScript
Styling:      Tailwind CSS + custom GlassUI
Templating:   EJS / Handlebars / JS template literals
Backend:      Next.js API Routes / Edge Functions
AI:           Gemini API / OpenAI API
```

### Генерируемые проекты
```
Contracts:    Solidity 0.8.x
Framework:    Foundry (preferred) / Hardhat
Libraries:    OpenZeppelin, Solady, LayerZero SDK
Frontend:     Next.js + TypeScript
Web3:         Wagmi v2 + Viem + RainbowKit
Styling:      Tailwind CSS + GlassUI components
```

---

## Competitive Advantage

| Конкурент | Что делает | Наше преимущество |
|-----------|------------|-------------------|
| OpenZeppelin Wizard | Только контракты | Fullstack + фронтенд + деплой |
| Scaffold-ETH | Один шаблон | Кастомизация + выбор опций |
| ThirdWeb | Закрытая экосистема | Open source + свои библиотеки |
| create-web3-dapp | Базовый | Cross-chain + AI + дизайн-система |

**Unique Selling Points:**
1. Cross-chain templates из коробки (LayerZero, CCIP, Wormhole)
2. GlassUI - красивый дизайн, не generic bootstrap
3. AI-powered documentation
4. EVM + Solana (редкая комбинация)

---

## MVP Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Создать один идеальный шаблон вручную (ERC-20 + Next.js)
- [ ] Отладить, протестировать деплой
- [ ] Веб-страница с формой (название токена, символ)
- [ ] Генерация ZIP по кнопке

### Phase 2: Expansion (Week 3-4)
- [ ] Добавить NFT шаблон
- [ ] Добавить Staking шаблон
- [ ] Выбор Foundry/Hardhat
- [ ] GlassUI компоненты

### Phase 3: Cross-Chain (Week 5-6)
- [ ] LayerZero OFT интеграция
- [ ] Chainlink CCIP шаблон
- [ ] Fork-тесты для кросс-чейна

### Phase 4: Polish (Week 7-8)
- [ ] AI "Explain Code"
- [ ] GitHub integration (создание repo)
- [ ] Landing page
- [ ] Documentation

---

## File Structure (Generated Project)

```
my-dapp/
├── contracts/
│   ├── src/
│   │   └── MyToken.sol
│   ├── test/
│   │   └── MyToken.t.sol
│   ├── script/
│   │   └── Deploy.s.sol
│   └── foundry.toml
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   └── ui/          # GlassUI components
│   │   ├── hooks/
│   │   └── lib/
│   ├── package.json
│   └── tailwind.config.ts
├── .env.example
└── README.md                 # AI-generated
```

---

## Notes
- Фокус на Developer Experience (DX)
- Всё должно работать из коробки: `npm install && npm run dev`
- Тесты обязательны в каждом шаблоне
- Документация генерируется автоматически
