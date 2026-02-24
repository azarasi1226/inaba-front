# CLAUDE.md — inaba-front

## Next.js ドキュメント参照

Next.jsに関わる作業の前に必ず `node_modules/next/dist/docs/` 内の該当ドキュメントを読む。学習データより最新のインストール済みドキュメントが正確。

## 言語方針

すべての回答・提案・コードレビューは **日本語** で出力する。

## プロジェクト概要

ECサイトのフロントエンド。ルート `/` は `/products` にリダイレクト。

- **Framework**: Next.js 16 (App Router) / React 19 / TypeScript strict
- **UI**: TailwindCSS v4, shadcn/ui, `cn()` ヘルパー（`@/lib/utils`）
- **Linter/Formatter**: Biome 2.3.13（ESLint/Prettier は使用しない）
- **バックエンド**: `NEXT_PUBLIC_API_URL`（デフォルト `http://localhost:8082`）

## コマンド

```bash
npm run dev          # 開発サーバー（Turbopack）
npm run build        # ビルド
npm run lint         # lint + format チェック & 自動修正（Biome）
npm run lint:check   # lint + format チェックのみ（修正なし）
```

**作業後の必須確認**: `npm run lint`

## ディレクトリ構成

```
src/
  app/
    products/
      _components/       # products ページ専用コンポーネント
        ProductCard.tsx  # 商品カード（Server Component）
        ProductSearch.tsx # 検索フォーム（Client Component）
      page.tsx           # 商品一覧ページ（API fetch、searchParams受け取り）
    layout.tsx           # ルートレイアウト（Geist フォント）
    error.tsx            # エラーバウンダリ（Client Component）
    not-found.tsx        # 404 ページ
    page.tsx             # / → /products リダイレクト
  components/
    ui/                  # shadcn/ui コンポーネント（直接編集しない）
  lib/
    utils.ts             # cn() ヘルパー（clsx + tailwind-merge）
```

**コロケーション原則**: 特定ページ専用 → `app/{route}/_components/`、複数ページ共通 → `src/components/`

## コーディング規約

- **TypeScript**: `any` 禁止。`interface` ではなく `type`。型インポートは `import type`。
- **import パス**: `@/` の絶対パスを使用（相対パス禁止）。
- **コンポーネント**: Server Components をデフォルト。`"use client"` は必要最小限。
- **UI**: shadcn/ui を優先。クラス結合は `cn()`。
- **enum 禁止**: Union 型で代替。
- **アクセシビリティ**: アイコンのみのボタンには必ず `aria-label`。
- **数値フォーマット**: `toLocaleString("ja-JP")` でロケールを明示。

## 既知の設定意図

- `biome.json` の `noShadowRestrictedNames: "off"` は `src/app/error.tsx` の関数名 `Error` がNext.js規約のため必要。意図的な設定なので変更しない。
- `biome.json` の `css.parser.tailwindDirectives: true` はTailwind v4の`@apply`等のカスタム構文対応。
- `src/components/ui/` は shadcn/ui が生成したファイル。アップデートで上書きされるため直接編集しない。カスタマイズは呼び出し側で行う。

## コミット規約

英語で `{type}: {description}` 形式。
type: `feat` / `fix` / `refactor` / `chore` / `style` / `docs`
