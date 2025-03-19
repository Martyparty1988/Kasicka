# Košík - Mockup

## Popis
Obrazovka košíku zobrazuje položky, které si uživatel vybral k objednání. Umožňuje upravit množství, odstranit položky, aplikovat slevu a pokračovat k fakturaci.

## Wireframe - Desktop

```
+--------------------------------------------------+
| LOGO  Správa Minibaru                 Uživatel ▼ |
+--------------------------------------------------+
| [Výběr vily ▼] Oh Yeah Villa                     |
+--------------------------------------------------+
| < Zpět na Inventář                               |
+--------------------------------------------------+
| KOŠÍK                                            |
|                                                  |
| +--------------------------------------------------+
| | POLOŽKY V KOŠÍKU                              | |
| |                                                | |
| | +--------------------------------------------+ | |
| | | Coca-Cola                                  | | |
| | | 32 CZK                     [- 2 +] [Odebrat]| | |
| | | Celkem: 64 CZK                             | | |
| | +--------------------------------------------+ | |
| |                                                | |
| | +--------------------------------------------+ | |
| | | Budvar                                     | | |
| | | 59 CZK                     [- 3 +] [Odebrat]| | |
| | | Celkem: 177 CZK                            | | |
| | +--------------------------------------------+ | |
| |                                                | |
| | +--------------------------------------------+ | |
| | | Wellness balíček                           | | |
| | | 500 CZK                    [- 1 +] [Odebrat]| | |
| | | Celkem: 500 CZK                            | | |
| | +--------------------------------------------+ | |
| |                                                | |
| | [POKRAČOVAT V NÁKUPU]                          | |
| +--------------------------------------------------+
|                                                  |
| +--------------------------------------------------+
| | SOUHRN OBJEDNÁVKY                             | |
| |                                                | |
| | Počet hostů: 4                [Upravit]        | |
| | Počet nocí: 3                 [Upravit]        | |
| |                                                | |
| | Mezisoučet: 741 CZK                           | |
| | Sleva (10%): -74.1 CZK        [Aplikovat ✓]   | |
| | City Tax: 24 EUR (600 CZK)                    | |
| |                                                | |
| | CELKEM: 1266.9 CZK                            | |
| |                                                | |
| | Měna: [CZK ▼]  Kurz: 1 EUR = 25 CZK [Upravit] | |
| |                                                | |
| | [DOKONČIT OBJEDNÁVKU]                         | |
| +--------------------------------------------------+
|                                                  |
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
| < Zpět na Inventář        |
+---------------------------+
| KOŠÍK                     |
|                           |
| POLOŽKY V KOŠÍKU:         |
|                           |
| +-------------------------+ |
| | Coca-Cola              | |
| | 32 CZK                 | |
| |                        | |
| | [- 2 +]  [Odebrat]     | |
| | Celkem: 64 CZK         | |
| +-------------------------+ |
|                           |
| +-------------------------+ |
| | Budvar                 | |
| | 59 CZK                 | |
| |                        | |
| | [- 3 +]  [Odebrat]     | |
| | Celkem: 177 CZK        | |
| +-------------------------+ |
|                           |
| +-------------------------+ |
| | Wellness balíček       | |
| | 500 CZK                | |
| |                        | |
| | [- 1 +]  [Odebrat]     | |
| | Celkem: 500 CZK        | |
| +-------------------------+ |
|                           |
| [POKRAČOVAT V NÁKUPU]     |
|                           |
| SOUHRN OBJEDNÁVKY:        |
|                           |
| Počet hostů: 4 [Upravit]  |
| Počet nocí: 3  [Upravit]  |
|                           |
| Mezisoučet: 741 CZK       |
| Sleva (10%): -74.1 CZK    |
| [Aplikovat ✓]             |
| City Tax: 24 EUR (600 CZK)|
|                           |
| CELKEM: 1266.9 CZK        |
|                           |
| Měna: [CZK ▼]             |
| Kurz: 1 EUR = 25 CZK      |
| [Upravit]                 |
|                           |
| [DOKONČIT OBJEDNÁVKU]     |
+---------------------------+
| © 2025 Luxury Villas      |
+---------------------------+
```

## Specifikace komponent

### Záhlaví (Header)
- Stejné jako na předchozích obrazovkách
- Odkaz "Zpět na Inventář" pro návrat na obrazovku inventáře

### Položky v košíku
- Seznam položek přidaných do košíku
- Každá položka obsahuje:
  - Název položky
  - Jednotková cena
  - Ovládací prvky pro množství (- a + tlačítka s číselným polem)
  - Tlačítko "Odebrat" pro odstranění položky z košíku
  - Celková cena za položku (jednotková cena × množství)
- Barva pozadí karty: Bílá (#FFFFFF)
- Barva okraje karty: Světle šedá (#E0E0E0)
- Barva názvu: Tmavě šedá (#333333)
- Barva ceny: Tmavě modrá (#1A365D)
- Barva tlačítka "Odebrat": Červená (#F44336)
- Barva textu tlačítka: Bílá (#FFFFFF)

### Tlačítko "Pokračovat v nákupu"
- Umožňuje návrat do inventáře pro přidání dalších položek
- Barva pozadí: Tmavě modrá (#1A365D)
- Barva textu: Bílá (#FFFFFF)
- Velikost: 200px šířka, 44px výška
- Okraje: Zaoblené (4px)
- Hover: Světlejší odstín modré (#2A466D)

### Souhrn objednávky
- Karta s přehledem objednávky obsahující:
  - Počet hostů a nocí s možností úpravy
  - Mezisoučet (suma cen všech položek)
  - Sleva (10%) s možností aplikace/zrušení
  - City Tax (2 EUR za osobu a noc)
  - Celková částka k úhradě
  - Výběr měny a nastavení směnného kurzu
- Barva pozadí: Světle šedá (#F5F5F5)
- Barva okraje: Středně šedá (#E0E0E0)
- Barva textu: Tmavě šedá (#333333)
- Barva celkové částky: Tmavě modrá (#1A365D), tučné
- Zaškrtávací pole pro slevu: Zlatá (#D4AF37) při zaškrtnutí

### Tlačítko "Dokončit objednávku"
- Výrazné tlačítko pro přechod k fakturaci
- Barva pozadí: Zlatá (#D4AF37)
- Barva textu: Tmavě modrá (#1A365D)
- Velikost: 100% šířky karty, 48px výška
- Okraje: Zaoblené (4px)
- Hover: Tmavší odstín zlaté (#C09F2F)

## Interakce

1. **Změna množství položky**:
   - Kliknutím na "+" se zvýší množství o 1
   - Kliknutím na "-" se sníží množství o 1 (minimálně 1)
   - Přímé zadání čísla do pole množství
   - Po změně množství se automaticky přepočítá celková cena položky a souhrn objednávky

2. **Odebrání položky**:
   - Kliknutím na "Odebrat" se položka odstraní z košíku
   - Před odstraněním se zobrazí potvrzovací dialog
   - Po odstranění se automaticky přepočítá souhrn objednávky

3. **Pokračování v nákupu**:
   - Kliknutím na "POKRAČOVAT V NÁKUPU" se uživatel vrátí na obrazovku inventáře
   - Položky v košíku zůstanou zachovány

4. **Úprava počtu hostů a nocí**:
   - Kliknutím na "Upravit" u počtu hostů nebo nocí se zobrazí modální okno s možností změny hodnoty
   - Po změně se automaticky přepočítá City Tax a celková částka

5. **Aplikace slevy**:
   - Kliknutím na zaškrtávací pole "Aplikovat" se aktivuje/deaktivuje 10% sleva
   - Sleva se aplikuje pouze na položky, ne na City Tax
   - Po změně se automaticky přepočítá celková částka

6. **Změna měny**:
   - Výběrem z rozbalovacího seznamu "Měna" se změní měna zobrazení (CZK/EUR)
   - Všechny ceny se přepočítají podle aktuálního směnného kurzu

7. **Úprava směnného kurzu**:
   - Kliknutím na "Upravit" u směnného kurzu se zobrazí modální okno s možností změny hodnoty
   - Po změně se automaticky přepočítají všechny ceny v alternativní měně

8. **Dokončení objednávky**:
   - Kliknutím na "DOKONČIT OBJEDNÁVKU" se uživatel přesměruje na obrazovku fakturace

## Responzivní chování

- **Desktop** (> 1024px):
  - Dvousloupcové rozložení pro položky v košíku a souhrn objednávky
  - Položky zobrazeny v plné šířce
  - Tlačítko "Pokračovat v nákupu" zarovnáno vlevo
  - Tlačítko "Dokončit objednávku" v plné šířce karty souhrnu

- **Tablet** (768px - 1024px):
  - Dvousloupcové rozložení s užšími sloupci
  - Kompaktnější zobrazení položek

- **Mobil** (< 768px):
  - Jednosloupcové rozložení
  - Položky a souhrn objednávky pod sebou
  - Tlačítka "Pokračovat v nákupu" a "Dokončit objednávku" v plné šířce obrazovky

## Přístupnost

- Všechny interaktivní prvky mají dostatečnou velikost pro ovládání dotykem
- Kontrastní barvy pro dobrou čitelnost
- Popisky pro všechna vstupní pole
- Možnost ovládání pomocí klávesnice
- ARIA atributy pro lepší podporu screen readerů
- Potvrzovací dialogy pro důležité akce (např. odstranění položky)
