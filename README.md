# Ex 5 – Create an Angular Component and Connect It with HTML

An Angular application with a custom **`StudentManager`** component that is connected to its
HTML template through every kind of Angular data binding.

| Concept | Where it is used |
|---|---|
| Interpolation `{{ }}` | Heading, stats, table rows |
| Property binding `[ ]` | `[disabled]` on the Add button, `[value]` on the search box |
| Event binding `( )` | `(click)`, `(input)`, `(ngSubmit)` |
| Two-way binding `[( )]` | `[(ngModel)]` on the form fields (live preview) |
| Class binding | `[class.fail]`, `[class.top]` on table rows |
| Control flow | `@if`, `@for … @empty` |
| Parent → child | `heading = input()` set from `app.html` |
| Child → parent | `countChange = output()` handled in `app.ts` |

## Project structure

```
src/app/
├── app.ts / app.html / app.css           ← root component (uses <app-student-manager>)
└── student-manager/
    ├── student-manager.ts                ← component class (logic + state)
    ├── student-manager.html              ← component template (the HTML)
    └── student-manager.css               ← component styles
```

## Run on Windows (one click)

1. Double-click **`setup.bat`** (only needed the first time).
   - Installs Node.js LTS with `winget` if Node.js 22+ is missing
   - Runs `npm install`
   - Starts the app and opens **http://localhost:4200**
2. After that, double-click **`run.bat`** to start it again.

## Run manually

```bash
npm install
npm start
```

Then open http://localhost:4200.

Built with Angular 22.
