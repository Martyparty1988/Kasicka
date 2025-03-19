# Fakturační systém - Mockup

## Popis
Obrazovka fakturačního systému umožňuje uživatelům dokončit objednávku, vybrat způsob platby a vygenerovat fakturu. Poskytuje detailní přehled objednaných položek a celkové částky k úhradě.

## Wireframe - Desktop

```
+--------------------------------------------------+
| LOGO  Správa Minibaru                 Uživatel ▼ |
+--------------------------------------------------+
| [Výběr vily ▼] Oh Yeah Villa                     |
+--------------------------------------------------+
| < Zpět do košíku                                 |
+--------------------------------------------------+
| FAKTURACE                                        |
|                                                  |
| +------------------+ +---------------------------+ |
| | ZPŮSOB PLATBY    | | NÁHLED FAKTURY           | |
| |                  | |                           | |
| | [•] Hotově       | | FAKTURA č. 2025001       | |
| | [ ] Kartou       | | Datum: 19.03.2025        | |
| | [ ] Neplaceno    | |                           | |
| |                  | | Oh Yeah Villa             | |
| | [Dokončit platbu]| | Počet hostů: 4           | |
| |                  | | Počet nocí: 3             | |
| |                  | |                           | |
| |                  | | POLOŽKY:                  | |
| |                  | | Coca-Cola (2x) ... 64 CZK | |
| |                  | | Budvar (3x) ..... 177 CZK | |
| |                  | | Wellness (1x) ... 500 CZK | |
| |                  | |                           | |
| |                  | | Mezisoučet: .... 741 CZK  | |
| |                  | | Sleva (10%): ... -74.1 CZK| |
| |                  | | City Tax: ...... 600 CZK  | |
| |                  | | (4 osoby × 3 noci × 2 EUR)| |
| |                  | |                           | |
| |                  | | CELKEM: ...... 1266.9 CZK | |
| |                  | |                           | |
| |                  | | Způsob platby: Hotově     | |
| |                  | |                           | |
| |                  | | [Stáhnout PDF] [Stáhnout JPEG] |
| +------------------+ +---------------------------+ |
|                                                  |
| [NOVÁ OBJEDNÁVKA]      [ZPĚT NA DASHBOARD]       |
+--------------------------------------------------+
| © 2025 Luxury Villas                              |
+--------------------------------------------------+
```

## Wireframe - Mobilní zařízení

```
+---------------------------+
| LOGO  Správa Minibaru  ☰ |
+---------------------------+
| [Výběr vily ▼]            |
| Oh Yeah Villa             |
+---------------------------+
| < Zpět do košíku          |
+---------------------------+
| FAKTURACE                 |
|                           |
| ZPŮSOB PLATBY:            |
|                           |
| [•] Hotově                |
| [ ] Kartou                |
| [ ] Neplaceno             |
|                           |
| [Dokončit platbu]         |
|                           |
| NÁHLED FAKTURY:           |
|                           |
| FAKTURA č. 2025001        |
| Datum: 19.03.2025         |
|                           |
| Oh Yeah Villa             |
| Počet hostů: 4            |
| Počet nocí: 3             |
|                           |
| POLOŽKY:                  |
| Coca-Cola (2x) ... 64 CZK |
| Budvar (3x) ..... 177 CZK |
| Wellness (1x) ... 500 CZK |
|                           |
| Mezisoučet: .... 741 CZK  |
| Sleva (10%): ... -74.1 CZK|
| City Tax: ...... 600 CZK  |
| (4 osoby × 3 noci × 2 EUR)|
|                           |
| CELKEM: ...... 1266.9 CZK |
|                           |
| Způsob platby: Hotově     |
|                           |
| [Stáhnout PDF]            |
| [Stáhnout JPEG]           |
|                           |
| [NOVÁ OBJEDNÁVKA]         |
| [ZPĚT NA DASHBOARD]       |
+---------------------------+
| © 2025 Luxury Villas      |
+---------------------------+
```

## Specifikace komponent

### Záhlaví (Header)
- Stejné jako na předchozích obrazovkách
- Odkaz "Zpět do košíku" pro návrat na obrazovku košíku

### Způsob platby
- Panel s výběrem způsobu platby pomocí přepínačů (radio buttons)
- Možnosti: Hotově, Kartou, Neplaceno
- Barva pozadí: Světle šedá (#F5F5F5)
- Barva textu: Tmavě šedá (#333333)
- Aktivní volba: Tmavě modrá (#1A365D) text, zlatá (#D4AF37) značka

### Tlačítko "Dokončit platbu"
- Potvrzuje výběr způsobu platby a generuje fakturu
- Barva pozadí: Zlatá (#D4AF37)
- Barva textu: Tmavě modrá (#1A365D)
- Velikost: 100% šířky panelu, 48px výška
- Okraje: Zaoblené (4px)
- Hover: Tmavší odstín zlaté (#C09F2F)

### Náhled faktury
- Panel s náhledem vygenerované faktury obsahující:
  - Číslo faktury a datum
  - Informace o vile, počtu hostů a nocí
  - Seznam objednaných položek s množstvím a cenou
  - Mezisoučet, slevu a city tax
  - Celkovou částku k úhradě
  - Zvolený způsob platby
- Barva pozadí: Bílá (#FFFFFF)
- Barva okraje: Středně šedá (#E0E0E0)
- Barva textu: Tmavě šedá (#333333)
- Barva celkové částky: Tmavě modrá (#1A365D), tučné

### Tlačítka pro stažení faktury
- Umožňují export faktury do různých formátů
- "Stáhnout PDF": Export do PDF formátu
- "Stáhnout JPEG": Export do JPEG formátu
- Barva pozadí: Tmavě modrá (#1A365D)
- Barva textu: Bílá (#FFFFFF)
- Velikost: 150px šířka, 44px výška
- Okraje: Zaoblené (4px)
- Hover: Světlejší odstín modré (#2A466D)

### Navigační tlačítka
- "NOVÁ OBJEDNÁVKA": Zahájí novou objednávku (vyčistí košík a vrátí se do inventáře)
- "ZPĚT NA DASHBOARD": Návrat na hlavní obrazovku
- Barva pozadí: Tmavě modrá (#1A365D)
- Barva textu: Bílá (#FFFFFF)
- Velikost: 200px šířka, 44px výška
- Okraje: Zaoblené (4px)
- Hover: Světlejší odstín modré (#2A466D)

## Interakce

1. **Výběr způsobu platby**:
   - Kliknutím na přepínač se vybere způsob platby
   - Výběr se automaticky promítne do náhledu faktury

2. **Dokončení platby**:
   - Kliknutím na "Dokončit platbu" se potvrdí platba a vygeneruje finální faktura
   - Zobrazí se potvrzení o úspěšném dokončení platby
   - Náhled faktury se aktualizuje s finálními údaji

3. **Stažení faktury**:
   - Kliknutím na "Stáhnout PDF" se vygeneruje a stáhne faktura ve formátu PDF
   - Kliknutím na "Stáhnout JPEG" se vygeneruje a stáhne faktura ve formátu JPEG

4. **Nová objednávka**:
   - Kliknutím na "NOVÁ OBJEDNÁVKA" se vyčistí košík a uživatel se přesměruje na obrazovku inventáře
   - Před vyčištěním košíku se zobrazí potvrzovací dialog

5. **Návrat na dashboard**:
   - Kliknutím na "ZPĚT NA DASHBOARD" se uživatel přesměruje na hlavní obrazovku

## Responzivní chování

- **Desktop** (> 1024px):
  - Dvousloupcové rozložení (způsob platby vlevo, náhled faktury vpravo)
  - Náhled faktury v plné šířce
  - Navigační tlačítka vedle sebe

- **Tablet** (768px - 1024px):
  - Dvousloupcové rozložení s užšími sloupci
  - Kompaktnější zobrazení náhledu faktury

- **Mobil** (< 768px):
  - Jednosloupcové rozložení
  - Způsob platby a náhled faktury pod sebou
  - Navigační tlačítka pod sebou v plné šířce obrazovky

## Přístupnost

- Všechny interaktivní prvky mají dostatečnou velikost pro ovládání dotykem
- Kontrastní barvy pro dobrou čitelnost
- Popisky pro všechny ovládací prvky
- Možnost ovládání pomocí klávesnice
- ARIA atributy pro lepší podporu screen readerů
- Potvrzovací dialogy pro důležité akce
