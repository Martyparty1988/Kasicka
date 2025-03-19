# Inventář - Mockup

## Popis
Obrazovka inventáře umožňuje uživatelům procházet a spravovat položky minibarů rozdělené do kategorií. Poskytuje přehledné zobrazení všech dostupných položek s možností filtrování a přidávání do košíku.

## Wireframe - Desktop

```
+--------------------------------------------------+
| LOGO  Správa Minibaru                 Uživatel ▼ |
+--------------------------------------------------+
| [Výběr vily ▼] Oh Yeah Villa                     |
+--------------------------------------------------+
| < Zpět na Dashboard                              |
+--------------------------------------------------+
| INVENTÁŘ                                         |
|                                                  |
| +----------+ +----------------------------------+ |
| | KATEGORIE| | POLOŽKY                         | |
| |          | |                                  | |
| | [•] Vše  | | Filtr: [                 ] [🔍] | |
| |          | |                                  | |
| | [ ] Nealko| | +------------------------------+ | |
| |          | | | Coca-Cola                    | | |
| | [ ] Alko | | | 32 CZK                       | | |
| |          | | | [Přidat do košíku] [- 1 +]   | | |
| | [ ] Pivo | | +------------------------------+ | |
| |          | |                                  | |
| | [ ] Relax| | +------------------------------+ | |
| |          | | | Sprite                       | | |
| |          | | | 32 CZK                       | | |
| |          | | | [Přidat do košíku] [- 1 +]   | | |
| |          | | +------------------------------+ | |
| |          | |                                  | |
| |          | | +------------------------------+ | |
| |          | | | Fanta                        | | |
| |          | | | 32 CZK                       | | |
| |          | | | [Přidat do košíku] [- 1 +]   | | |
| |          | | +------------------------------+ | |
| |          | |                                  | |
| |          | | +------------------------------+ | |
| |          | | | Red Bull                     | | |
| |          | | | 59 CZK                       | | |
| |          | | | [Přidat do košíku] [- 1 +]   | | |
| |          | | +------------------------------+ | |
| |          | |                                  | |
| |          | | [< Předchozí] [1 2 3 ...] [Další >] |
| +----------+ +----------------------------------+ |
|                                                  |
| [PŘEJÍT DO KOŠÍKU (3)]                           |
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
| < Zpět na Dashboard       |
+---------------------------+
| INVENTÁŘ                  |
|                           |
| KATEGORIE:                |
| [Vše ▼]                   |
|                           |
| Filtr: [           ] [🔍] |
|                           |
| +-------------------------+ |
| | Coca-Cola              | |
| | 32 CZK                 | |
| |                        | |
| | [- 1 +] [Přidat]       | |
| +-------------------------+ |
|                           |
| +-------------------------+ |
| | Sprite                 | |
| | 32 CZK                 | |
| |                        | |
| | [- 1 +] [Přidat]       | |
| +-------------------------+ |
|                           |
| +-------------------------+ |
| | Fanta                  | |
| | 32 CZK                 | |
| |                        | |
| | [- 1 +] [Přidat]       | |
| +-------------------------+ |
|                           |
| +-------------------------+ |
| | Red Bull               | |
| | 59 CZK                 | |
| |                        | |
| | [- 1 +] [Přidat]       | |
| +-------------------------+ |
|                           |
| [< Předchozí] [1] [Další >] |
|                           |
| [PŘEJÍT DO KOŠÍKU (3)]    |
+---------------------------+
| © 2025 Luxury Villas      |
+---------------------------+
```

## Specifikace komponent

### Záhlaví (Header)
- Stejné jako na dashboardu
- Odkaz "Zpět na Dashboard" pro návrat na hlavní obrazovku

### Kategorie
- Na desktopu: Panel s výběrem kategorií pomocí přepínačů (radio buttons)
- Na mobilu: Rozbalovací seznam pro výběr kategorie
- Možnosti: Vše, Nealkoholické nápoje, Alkoholické nápoje, Pivo, Relax
- Barva pozadí: Světle šedá (#F5F5F5)
- Barva textu: Tmavě šedá (#333333)
- Aktivní kategorie: Tmavě modrá (#1A365D) text

### Filtr
- Textové pole pro vyhledávání položek
- Tlačítko s ikonou lupy pro potvrzení vyhledávání
- Barva pozadí: Bílá (#FFFFFF)
- Barva okraje: Středně šedá (#E0E0E0)
- Barva textu: Tmavě šedá (#333333)

### Seznam položek
- Každá položka je zobrazena jako karta obsahující:
  - Název položky
  - Cena (v aktuálně vybrané měně)
  - Ovládací prvky pro množství (- a + tlačítka s číselným polem)
  - Tlačítko "Přidat do košíku"
- Barva pozadí karty: Bílá (#FFFFFF)
- Barva okraje karty: Světle šedá (#E0E0E0)
- Stín: Jemný stín pro vytvoření hloubky
- Barva názvu: Tmavě šedá (#333333)
- Barva ceny: Tmavě modrá (#1A365D)
- Barva tlačítka "Přidat do košíku": Zlatá (#D4AF37)
- Barva textu tlačítka: Tmavě modrá (#1A365D)

### Stránkování
- Navigační prvky pro procházení více stránek položek
- Tlačítka "Předchozí" a "Další"
- Číselné odkazy na konkrétní stránky
- Barva textu: Tmavě modrá (#1A365D)
- Aktivní stránka: Zlatá (#D4AF37) pozadí, tmavě modrý (#1A365D) text

### Tlačítko košíku
- Výrazné tlačítko ve spodní části obrazovky
- Zobrazuje počet položek v košíku v závorce
- Barva pozadí: Zlatá (#D4AF37)
- Barva textu: Tmavě modrá (#1A365D)
- Velikost: 100% šířky na mobilu, 300px na desktopu
- Výška: 48px
- Okraje: Zaoblené (4px)
- Hover: Tmavší odstín zlaté (#C09F2F)

## Interakce

1. **Výběr kategorie**:
   - Kliknutím na kategorii se filtruje seznam položek
   - Na desktopu: Výběr pomocí přepínačů
   - Na mobilu: Výběr z rozbalovacího seznamu

2. **Vyhledávání**:
   - Zadáním textu do pole filtru a kliknutím na ikonu lupy se filtrují položky podle názvu
   - Vyhledávání je case-insensitive a hledá částečné shody

3. **Změna množství**:
   - Kliknutím na "+" se zvýší množství o 1
   - Kliknutím na "-" se sníží množství o 1 (minimálně 1)
   - Přímé zadání čísla do pole množství

4. **Přidání do košíku**:
   - Kliknutím na "Přidat do košíku" se přidá položka v zadaném množství do košíku
   - Po přidání se zobrazí potvrzení (toast notifikace)
   - Počet položek v košíku se aktualizuje

5. **Stránkování**:
   - Kliknutím na číslo stránky se zobrazí příslušná stránka
   - Kliknutím na "Předchozí" se zobrazí předchozí stránka
   - Kliknutím na "Další" se zobrazí následující stránka

6. **Přechod do košíku**:
   - Kliknutím na tlačítko "PŘEJÍT DO KOŠÍKU" se uživatel přesměruje na obrazovku košíku

## Responzivní chování

- **Desktop** (> 1024px):
  - Dvousloupcové rozložení (kategorie vlevo, položky vpravo)
  - Položky zobrazeny v mřížce 1x4 (jedna pod druhou)
  - Plné stránkování s čísly stránek

- **Tablet** (768px - 1024px):
  - Dvousloupcové rozložení s užšími sloupci
  - Položky zobrazeny v mřížce 1x3
  - Kompaktnější stránkování

- **Mobil** (< 768px):
  - Jednosloupcové rozložení
  - Kategorie jako rozbalovací seznam
  - Položky zobrazeny jedna pod druhou
  - Zjednodušené stránkování (pouze předchozí/další a aktuální stránka)

## Přístupnost

- Všechny interaktivní prvky mají dostatečnou velikost pro ovládání dotykem
- Kontrastní barvy pro dobrou čitelnost
- Popisky pro všechna vstupní pole
- Možnost ovládání pomocí klávesnice
- ARIA atributy pro lepší podporu screen readerů
