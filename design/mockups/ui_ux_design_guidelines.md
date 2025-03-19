# UI/UX Design Guidelines - Aplikace "Správa Minibaru"

## Základní principy designu

Aplikace "Správa Minibaru" bude navržena s důrazem na následující principy:

1. **Jednoduchost a přehlednost** - intuitivní rozhraní s jasnou hierarchií informací
2. **Responzivní design** - optimální zobrazení na všech zařízeních (desktop, tablet, mobil)
3. **Touch-friendly** - dostatečně velké interaktivní prvky pro snadné ovládání dotykem
4. **Konzistence** - jednotný vizuální styl napříč celou aplikací
5. **Efektivita** - minimalizace počtu kroků potřebných k dokončení úkolů
6. **Luxusní vzhled** - design odpovídající luxusnímu charakteru vil

## Barevná paleta

Barevná paleta bude odrážet luxusní charakter vil a zároveň zajistí dobrou čitelnost a přístupnost:

### Primární barvy
- **Tmavě modrá (#1A365D)** - hlavní barva, použitá pro záhlaví, navigaci a důležité prvky
- **Zlatá (#D4AF37)** - akcentová barva pro zvýraznění důležitých prvků a tlačítek

### Sekundární barvy
- **Světle šedá (#F5F5F5)** - pozadí aplikace
- **Středně šedá (#E0E0E0)** - oddělující prvky, okraje
- **Tmavě šedá (#333333)** - text

### Funkční barvy
- **Zelená (#4CAF50)** - úspěch, potvrzení
- **Červená (#F44336)** - chyba, varování
- **Modrá (#2196F3)** - informace, odkazy

## Typografie

Pro zajištění dobré čitelnosti a konzistentního vzhledu:

- **Nadpisy**: Playfair Display (serif) - elegantní, luxusní vzhled
- **Tělo textu**: Open Sans (sans-serif) - dobrá čitelnost na všech zařízeních
- **Velikosti písma**:
  - Hlavní nadpisy: 24px (desktop) / 20px (mobil)
  - Podnadpisy: 18px (desktop) / 16px (mobil)
  - Běžný text: 16px (desktop) / 14px (mobil)
  - Malý text: 14px (desktop) / 12px (mobil)

## Ikony a grafické prvky

- Konzistentní sada ikon (Material Design nebo vlastní sada)
- Minimalistické grafické prvky s důrazem na eleganci
- Fotografie vil a vybraných položek v vysoké kvalitě

## Komponenty uživatelského rozhraní

### Navigace
- **Desktop**: Horizontální navigační lišta v horní části obrazovky
- **Mobil**: Hamburger menu s vysouvací navigací

### Tlačítka
- **Primární tlačítka**: Výrazná, zlatá barva s tmavě modrým textem
- **Sekundární tlačítka**: Tmavě modrá s bílým textem
- **Terciární tlačítka**: Transparentní s tmavě modrým okrajem a textem
- **Velikost tlačítek**: Minimálně 44x44px pro touch-friendly ovládání

### Formulářové prvky
- **Textová pole**: Jasně definované okraje, animace při fokusování
- **Rozbalovací seznamy**: Dostatečně velké pro snadný výběr dotykem
- **Přepínače a zaškrtávací pole**: Vizuálně výrazné, snadno kliknutelné

### Karty a kontejnery
- Jemné stíny pro vytvoření hloubky
- Zaoblené rohy pro moderní vzhled
- Konzistentní odsazení a mezery

## Responzivní design

### Breakpointy
- **Mobil**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Layouty
- **Desktop**: Vícesloupcový layout s bočním panelem
- **Tablet**: Dvousloupcový layout
- **Mobil**: Jednosloupcový layout s hamburger menu

## Interakce a animace

- Jemné přechody mezi stavy (hover, active, focus)
- Animace pro poskytnutí zpětné vazby uživateli
- Plynulé přechody mezi obrazovkami
- Vizuální indikace načítání dat

## Přístupnost

- Dostatečný kontrast mezi textem a pozadím (WCAG AA standard)
- Alternativní texty pro obrázky
- Klávesová navigace
- Responzivní design pro různé velikosti obrazovek

## Specifické obrazovky a komponenty

### 1. Přihlašovací obrazovka
- Jednoduchý, elegantní design
- Logo aplikace
- Přihlašovací formulář s validací
- Možnost "Zapomenuté heslo"

### 2. Dashboard
- Přehled aktuálně vybrané vily
- Rychlý přístup k hlavním funkcím
- Statistiky a grafy (pro administrátory a manažery)

### 3. Výběr vily
- Vizuálně atraktivní karty s fotografiemi vil
- Základní informace o každé vile
- Možnost rychlého přepínání mezi vilami

### 4. Správa inventáře
- Přehledné zobrazení kategorií
- Seznam položek s možností filtrování a řazení
- Detail položky s možností úpravy (pro oprávněné uživatele)

### 5. Košík
- Přehledný seznam vybraných položek
- Možnost změny množství nebo odstranění položek
- Výpočet celkové ceny s rozpisem (položky, sleva, city tax)
- Tlačítko pro dokončení objednávky

### 6. Fakturační systém
- Přehledný formulář pro zadání fakturačních údajů
- Náhled faktury před tiskem/exportem
- Možnosti exportu (PDF, JPEG)
- Výběr způsobu platby

### 7. Nastavení
- Přehledné rozdělení do sekcí
- Formuláře pro změnu nastavení
- Okamžitá zpětná vazba při změně nastavení

## PWA funkcionalita

- Instalovatelná aplikace s vlastní ikonou
- Offline režim s synchronizací po obnovení připojení
- Push notifikace (pro oprávněné uživatele)
- Rychlé načítání a responzivní design

## Mobilní specifika

- Optimalizace pro dotykové ovládání
- Dostatečně velké interaktivní prvky (min. 44x44px)
- Přizpůsobení layoutu pro menší obrazovky
- Podpora gest (swipe, pinch-to-zoom)

## Testování a iterace

- Uživatelské testování na různých zařízeních
- A/B testování klíčových funkcí
- Iterativní vylepšování na základě zpětné vazby
- Testování přístupnosti
