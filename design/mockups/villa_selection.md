# Výběr vily - Mockup

## Popis
Obrazovka výběru vily umožňuje uživatelům přepínat mezi třemi typy luxusních vil (Oh Yeah Villa, Amazing Pool Villa, Little Castle Villa) a zobrazuje základní informace o každé vile.

## Wireframe - Desktop

```
+--------------------------------------------------+
| LOGO  Správa Minibaru                 Uživatel ▼ |
+--------------------------------------------------+
| < Zpět na Dashboard                              |
+--------------------------------------------------+
| VÝBĚR VILY                                       |
|                                                  |
| +------------------+ +------------------+ +------------------+ |
| |                  | |                  | |                  | |
| |  [OBRÁZEK VILY]  | |  [OBRÁZEK VILY]  | |  [OBRÁZEK VILY]  | |
| |                  | |                  | |                  | |
| |  Oh Yeah Villa   | | Amazing Pool Villa| | Little Castle Villa |
| |                  | |                  | |                  | |
| |  Luxusní vila s  | |  Vila s bazénem  | |  Menší vila ve   | |
| |  výhledem na moře | |  a zahradou      | |  stylu hradu     | |
| |                  | |                  | |                  | |
| |  [VYBRAT VILU]   | |  [VYBRAT VILU]   | |  [VYBRAT VILU]   | |
| |                  | |                  | |                  | |
| +------------------+ +------------------+ +------------------+ |
|                                                  |
| +--------------------------------------------------+
| | DETAIL VYBRANÉ VILY                            | |
| |                                                | |
| | Aktuálně vybraná vila: Oh Yeah Villa           | |
| |                                                | |
| | Popis: Luxusní vila s výhledem na moře, nabízí | |
| | komfortní ubytování až pro 8 osob. Vila je     | |
| | vybavena moderním nábytkem a technologiemi.    | |
| |                                                | |
| | Kapacita: 8 osob                               | |
| | Počet ložnic: 4                                | |
| | Počet koupelen: 3                              | |
| |                                                | |
| | [PŘEJÍT DO INVENTÁŘE]  [PŘEJÍT DO NASTAVENÍ]   | |
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
| < Zpět na Dashboard       |
+---------------------------+
| VÝBĚR VILY                |
|                           |
| +-------------------------+ |
| |                         | |
| |    [OBRÁZEK VILY]       | |
| |                         | |
| |    Oh Yeah Villa        | |
| |                         | |
| |    Luxusní vila s       | |
| |    výhledem na moře     | |
| |                         | |
| |    [VYBRAT VILU]        | |
| |                         | |
| +-------------------------+ |
|                           |
| +-------------------------+ |
| |                         | |
| |    [OBRÁZEK VILY]       | |
| |                         | |
| |    Amazing Pool Villa   | |
| |                         | |
| |    Vila s bazénem       | |
| |    a zahradou           | |
| |                         | |
| |    [VYBRAT VILU]        | |
| |                         | |
| +-------------------------+ |
|                           |
| +-------------------------+ |
| |                         | |
| |    [OBRÁZEK VILY]       | |
| |                         | |
| |    Little Castle Villa  | |
| |                         | |
| |    Menší vila ve        | |
| |    stylu hradu          | |
| |                         | |
| |    [VYBRAT VILU]        | |
| |                         | |
| +-------------------------+ |
|                           |
| DETAIL VYBRANÉ VILY:      |
|                           |
| Aktuálně vybraná vila:    |
| Oh Yeah Villa             |
|                           |
| Popis: Luxusní vila s     |
| výhledem na moře, nabízí  |
| komfortní ubytování až    |
| pro 8 osob. Vila je       |
| vybavena moderním         |
| nábytkem a technologiemi. |
|                           |
| Kapacita: 8 osob          |
| Počet ložnic: 4           |
| Počet koupelen: 3         |
|                           |
| [PŘEJÍT DO INVENTÁŘE]     |
| [PŘEJÍT DO NASTAVENÍ]     |
+---------------------------+
| © 2025 Luxury Villas      |
+---------------------------+
```

## Specifikace komponent

### Záhlaví (Header)
- Stejné jako na předchozích obrazovkách
- Odkaz "Zpět na Dashboard" pro návrat na hlavní obrazovku

### Karty vil
- Tři karty představující jednotlivé vily:
  - Oh Yeah Villa
  - Amazing Pool Villa
  - Little Castle Villa
- Každá karta obsahuje:
  - Obrázek vily
  - Název vily
  - Krátký popis
  - Tlačítko "VYBRAT VILU"
- Barva pozadí: Bílá (#FFFFFF)
- Barva okraje: Světle šedá (#E0E0E0)
- Stín: Jemný stín pro vytvoření hloubky
- Barva názvu: Tmavě modrá (#1A365D), tučné
- Barva popisu: Tmavě šedá (#333333)
- Barva tlačítka: Zlatá (#D4AF37)
- Barva textu tlačítka: Tmavě modrá (#1A365D)
- Hover efekt: Jemné zvětšení karty a zvýraznění stínu

### Detail vybrané vily
- Panel s detailními informacemi o aktuálně vybrané vile:
  - Název vily
  - Podrobný popis
  - Kapacita (počet osob)
  - Počet ložnic
  - Počet koupelen
  - Navigační tlačítka
- Barva pozadí: Světle šedá (#F5F5F5)
- Barva okraje: Středně šedá (#E0E0E0)
- Barva textu: Tmavě šedá (#333333)
- Barva názvu: Tmavě modrá (#1A365D), tučné

### Navigační tlačítka
- "PŘEJÍT DO INVENTÁŘE": Přesměrování na obrazovku inventáře
- "PŘEJÍT DO NASTAVENÍ": Přesměrování na obrazovku nastavení
- Barva pozadí: Tmavě modrá (#1A365D)
- Barva textu: Bílá (#FFFFFF)
- Velikost: 200px šířka, 44px výška
- Okraje: Zaoblené (4px)
- Hover: Světlejší odstín modré (#2A466D)

## Interakce

1. **Výběr vily**:
   - Kliknutím na tlačítko "VYBRAT VILU" se nastaví příslušná vila jako aktivní
   - Panel s detailem vily se aktualizuje podle vybrané vily
   - Aktivní vila je zvýrazněna (např. zlatým okrajem)

2. **Přechod do inventáře**:
   - Kliknutím na "PŘEJÍT DO INVENTÁŘE" se uživatel přesměruje na obrazovku inventáře pro vybranou vilu

3. **Přechod do nastavení**:
   - Kliknutím na "PŘEJÍT DO NASTAVENÍ" se uživatel přesměruje na obrazovku nastavení

## Responzivní chování

- **Desktop** (> 1024px):
  - Karty vil zobrazeny vedle sebe v jednom řádku
  - Detail vily pod kartami v plné šířce
  - Navigační tlačítka vedle sebe

- **Tablet** (768px - 1024px):
  - Karty vil zobrazeny vedle sebe v jednom řádku, ale užší
  - Detail vily pod kartami v plné šířce
  - Navigační tlačítka vedle sebe

- **Mobil** (< 768px):
  - Karty vil zobrazeny pod sebou
  - Detail vily pod kartami v plné šířce
  - Navigační tlačítka pod sebou v plné šířce

## Přístupnost

- Všechny interaktivní prvky mají dostatečnou velikost pro ovládání dotykem
- Kontrastní barvy pro dobrou čitelnost
- Alternativní texty pro obrázky
- Možnost ovládání pomocí klávesnice
- ARIA atributy pro lepší podporu screen readerů
