# 実装計画 — Data & Canvas（HTML + CSS + JS）

## 概要

[spec.md](file:///Users/user/Documents/development/web_production_advance/spec.md) の仕様に基づき、**純粋な HTML / Vanilla CSS / JavaScript** のみで構築するポートフォリオサイト。
フレームワーク・ビルドツールは一切使用せず、ブラウザで直接開ける静的サイトとする。

---

## 提案ディレクトリ構造

```
web_production_advance/
├── index.html          # Home
├── projects.html       # Projects
├── journal.html        # Journal
├── about.html          # About
├── contact.html        # Contact
├── css/
│   ├── variables.css   # デザイントークン（カラー・フォント変数）
│   ├── base.css        # リセット・ベーススタイル
│   ├── layout.css      # 共通レイアウト（ヘッダー・フッター・グリッド）
│   ├── components.css  # カード・ボタン・タグなどの部品
│   └── pages/
│       ├── home.css
│       ├── projects.css
│       ├── journal.css
│       ├── about.css
│       └── contact.css
├── js/
│   ├── nav.js          # ナビゲーション（ハンバーガーメニュー）
│   ├── journal.js      # タグフィルタ
│   └── contact.js      # フォーム送信ハンドリング
├── images/             # 画像素材置き場
└── spec.md
```

---

## Proposed Changes

### デザイントークン

#### [NEW] css/variables.css
- `--color-base: #F9F9F9`（背景）
- `--color-main: #333333`（テキスト）
- `--color-accent: #8B5A2B`（アクセント）
- フォント：Google Fonts「Noto Sans JP + Inter」
- スペーシング・シャドウ変数

---

### 各ページ実装

#### [NEW] index.html — Home
- Hero セクション：キャッチコピー + 背景画像
- Projects ピックアップ：カード2枚
- Journal 最新記事：サムネイル + タイトル + タグ

#### [NEW] projects.html — Projects
- カードグリッド：使用技術タグ・GitHubリンク付き
- ホバー時の浮き上がりアニメーション

#### [NEW] journal.html — Journal
- 記事カード一覧（サムネイル・日付・タグ）
- タグクリックによるフィルタリング（`journal.js`）
- 記事データは JS の配列で管理（Markdown CMS 不要のシンプルな運用）

#### [NEW] about.html — About
- プロフィールテキスト・スキルセット一覧

#### [NEW] contact.html — Contact
- 入力フォーム（名前・メール・メッセージ）
- 送信時にポップアップで完了メッセージ表示（`contact.js`）

---

## 検証計画

### ブラウザ動作確認（手動）
ブラウザで各ファイルを直接開いて確認します。

```
# macOS の場合
open index.html
open projects.html
open journal.html
open about.html
open contact.html
```

確認項目:
1. 全ページのナビゲーションリンクが正常に動作する
2. Journal タグフィルタのクリックで記事が絞り込まれる
3. Contact フォームの送信で完了メッセージが表示される
4. SP（375px）・タブレット（768px）・PC（1200px+）各幅でレイアウトが崩れない
5. カードホバー時にアニメーションが発生する

### 自動テスト
静的 HTML サイトのため、自動テストは設定しない（ブラウザでの目視確認のみ）。

---

> **注意:** Journal の記事データは JS 配列で管理するため、
> 記事の追加は `js/journal.js` 内の配列に1行追記するだけで完了します。
