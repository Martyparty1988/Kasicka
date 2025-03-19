# Dashboard - Mockup

## Popis
Dashboard je hlavní obrazovka aplikace po přihlášení, která poskytuje přehled o aktuálně vybrané vile a rychlý přístup k hlavním funkcím aplikace.

## Wireframe - Desktop

```
+--------------------------------------------------+
| LOGO  Správa Minibaru                 Uživatel ▼ |
+--------------------------------------------------+
| [Výběr vily ▼] Oh Yeah Villa                     |
+--------------------------------------------------+
|                                                  |
| +--------+ +--------+ +--------+ +--------+      |
| |        | |        | |        | |        |      |
| |Inventář| |  Košík | |Faktury | |Nastavení|     |
| |        | |        | |        | |        |      |
| +--------+ +--------+ +--------+ +--------+      |
|                                                  |
| +--------------------------------------------------+
| | PŘEHLED VILY                                   | |
| |                                                | |
| | Počet hostů: 4                                 | |
| | Počet nocí: 3                                  | |
| | City Tax: 24 EUR (2 EUR/osoba/noc)             | |
| |                                                | |
| | [UPRAVIT NASTAVENÍ VILY]                       | |
| +--------------------------------------------------+
|                                                  |
| +------------------+ +-------------------------+ |
| | KATEGORIE        | | POSLEDNÍ OBJEDNÁVKY     | |
| |                  | |                         | |
| | • Nealkoholické  | | #123 - 12.3.2025        | |
| | • Alkoholické    | | 450 CZK - Zaplaceno     | |
| | • Pivo           | |                         | |
| | • Relax          | | #122 - 11.3.2025        | |
| |                  | | 1200 CZK - Nezaplaceno  | |
| | [ZOBRAZIT VŠE]   | |                         | |
| +------------------+ | [ZOBRAZIT VŠE]          | |
|                      +-------------------------+ |
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
|                           |
| +-------+ +-------+       |
| |       | |       |       |
| |Inventář| |Košík |       |
| |       | |       |       |
| +-------+ +-------+       |
|                           |
| +-------+ +-------+       |
| |       | |       |       |
| |Faktury | |Nastavení|    |
| |       | |       |       |
| +-------+ +-------+       |
|                           |
| +-------------------------+
| | PŘEHLED VILY          | |
| |                       | |
| | Počet hostů: 4        | |
| | Počet nocí: 3         | |
| | City Tax: 24 EUR      | |
| |                       | |
| | [UPRAVIT NASTAVENÍ]   | |
| +-------------------------+
|                           |
| +-------------------------+
| | KATEGORIE             | |
| |                       | |
| | • Nealkoholické       | |
| | • Alkoholické         | |
| | • Pivo                | |
| | • Relax               | |
| |                       | |
| | [ZOBRAZIT VŠE]        | |
| +-------------------------+
|                           |
| +-------------------------+
| | POSLEDNÍ OBJEDNÁVKY   | |
| |                       | |
| | #123 - 12.3.2025      | |
| | 450 CZK - Zaplaceno   | |
| |                       | |
| | #122 - 11.3.2025      | |
| | 1200 CZK - Nezaplaceno| |
| |                       | |
| | [ZOBRAZIT VŠE]        | |
| +-------------------------+
|                           |
| © 2025 Luxury Villas      |
+---------------------------+
```

## Specifikace komponent

### Záhlaví (Header)
- Logo: Vlevo, menší verze loga aplikace
- Název aplikace: "Správa Minibaru" v písmu Playfair Display
- Uživatelský profil: Vpravo, jméno přihlášeného uživatele s rozbalovací nabídkou
- Mobilní menu: Ikona hamburgeru (pouze na mobilních zařízeních)

### Výběr vily
- Rozbalovací seznam s možností výběru vily
- Aktuálně vybraná vila je zobrazena pod rozbalovacím seznamem
- Barva pozadí: Světle modrá (#E3F2FD)
- Barva textu: Tmavě modrá (#1A365D)

### Rychlý přístup
- Čtyři dlaždice pro rychlý přístup k hlavním funkcím:
  - Inventář
  - Košík
  - Faktury
  - Nastavení
- Každá dlaždice obsahuje ikonu a název funkce
- Barva pozadí: Bílá (#FFFFFF)
- Barva okraje: Světle šedá (#E0E0E0)
- Barva textu: Tmavě modrá (#1A365D)
- Hover: Světle zlatá (#F5EBC8)
- Na mobilních zařízeních jsou dlaždice uspořádány do mřížky 2x2

### Přehled vily
- Karta s informacemi o aktuálně vybrané vile
- Zobrazuje počet hostů, počet nocí a vypočítaný city tax
- Tlačítko pro úpravu nastavení vily
- Barva pozadí: Bílá (#FFFFFF)
- Barva okraje: Světle šedá (#E0E0E0)
- Stín: Jemný stín pro vytvoření hloubky

### Kategorie
- Seznam kategorií produktů s možností rychlého přístupu
- Každá kategorie je zobrazena jako položka seznamu s odrážkou
- Tlačítko "ZOBRAZIT VŠE" pro přechod na kompletní seznam kategorií
- Barva pozadí: Bílá (#FFFFFF)
- Barva okraje: Světle šedá (#E0E0E0)
- Barva textu: Tmavě šedá (#333333)
- Barva tlačítka: Zlatá (#D4AF37)

### Poslední objednávky
- Seznam posledních objednávek s jejich základními informacemi
- Každá objednávka zobrazuje číslo, datum, částku a stav
- Tlačítko "ZOBRAZIT VŠE" pro přechod na kompletní seznam objednávek
- Barva pozadí: Bílá (#FFFFFF)
- Barva okraje: Světle šedá (#E0E0E0)
- Barva textu: Tmavě šedá (#333333)
- Barva tlačítka: Zlatá (#D4AF37)
- Stav "Zaplaceno": Zelená (#4CAF50)
- Stav "Nezaplaceno": Červená (#F44336)

### Patička
- Copyright text: "© 2025 Luxury Villas"
- Velikost písma: 14px
- Barva: Tmavě šedá (#333333)
- Umístění: Centrováno v dolní části obrazovky

## Interakce

1. **Výběr vily**:
   - Kliknutím na rozbalovací seznam se zobrazí dostupné vily
   - Výběrem vily se aktualizuje obsah dashboardu

2. **Rychlý přístup**:
   - Kliknutím na dlaždici se uživatel přesměruje na příslušnou sekci aplikace

3. **Úprava nastavení vily**:
   - Kliknutím na tlačítko "UPRAVIT NASTAVENÍ VILY" se otevře modální okno s možností úpravy počtu hostů, počtu nocí a dalších nastavení

4. **Kategorie**:
   - Kliknutím na kategorii se uživatel přesměruje na seznam položek v dané kategorii
   - Kliknutím na "ZOBRAZIT VŠE" se uživatel přesměruje na kompletní seznam kategorií

5. **Poslední objednávky**:
   - Kliknutím na objednávku se uživatel přesměruje na detail objednávky
   - Kliknutím na "ZOBRAZIT VŠE" se uživatel přesměruje na kompletní seznam objednávek

6. **Uživatelský profil**:
   - Kliknutím na jméno uživatele se rozbalí nabídka s možnostmi:
     - Profil
     - Změna hesla
     - Odhlášení

## Responzivní chování

- **Desktop** (> 1024px):
  - Dvousloupcové rozložení pro sekce Kategorie a Poslední objednávky
  - Horizontální záhlaví s plným zobrazením

- **Tablet** (768px - 1024px):
  - Dvousloupcové rozložení pro sekce Kategorie a Poslední objednávky
  - Horizontální záhlaví s kompaktnějším zobrazením

- **Mobil** (< 768px):
  - Jednosloupcové rozložení, všechny sekce pod sebou
  - Hamburger menu místo plného zobrazení uživatelského profilu
  - Dlaždice rychlého přístupu uspořádány do mřížky 2x2

## Přístupnost

- Všechny interaktivní prvky mají dostatečnou velikost pro ovládání dotykem
- Kontrastní barvy pro dobrou čitelnost
- Sémantické HTML elementy pro lepší navigaci pomocí screen readeru
- Možnost ovládání pomocí klávesnice
