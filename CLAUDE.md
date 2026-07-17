# CLAUDE.md — Data & Canvas ポートフォリオサイト 構成ガイド

このファイルは、AI（Claude Code 等）が別セッションからこのサイトの機能追加・編集を行う際に、
最短で全体像を把握するためのドキュメントである。構成を変更したら本ファイルも更新すること。

---

## プロジェクト概要

- **サイト名**: Data & Canvas — Portfolio & Journal
- **公開URL**: https://jiro0025.github.io/demo_hp_site_advance_ver/
- **リポジトリ**: GitHub `jiro0025/demo_hp_site_advance_ver`（GitHub Pages でホスティング。main に push すると公開される）
- **技術**: HTML5 + Vanilla CSS + Vanilla JS。**フレームワーク・ビルドツールなし**。ブラウザで直接開いて動作確認できる
- **用途**: 個人開発ポートフォリオの展示 + グループ会での AI 活用事例共有

---

## ディレクトリ構成

```
web_production_advance/
├── CLAUDE.md                    # 本ファイル
├── README.md                    # 公開用README
├── index.html                   # Home（ヒーロー + 各セクションへの導線）
├── projects.html                # 制作物ポートフォリオ（project-card のグリッド）
├── journal.html                 # 記事一覧（js/journal.js のデータ配列から描画・タグフィルター付き）
├── about.html                   # プロフィール・スキル
├── contact.html                 # 問い合わせフォーム（js/contact.js でクライアントサイドバリデーション）
├── ai-examples.html             # ★ AI活用事例一覧（25カード・カテゴリ/ステータスフィルター）
├── ai-examples-showcase.html    # ★ グループ会向け深掘りページ（事例01=教材システム / 事例02=Kindle分析）
├── kindle-demo.html             # 単体デモ: 読書×日記 人生設計書（完全インラインCSS・ダークテーマ）
├── process-materials-ds.html    # 単体資料: 教材ジェネレーターの開発プロセス全記録（完全インラインCSS・ダークテーマ）
├── css/
│   ├── variables.css            # デザイントークン（下記参照）
│   ├── base.css                 # リセット・ベース
│   ├── layout.css               # ヘッダー・フッター・ナビ
│   ├── components.css           # 共通部品（.btn .btn-primary .btn-outline .tag .section-label など）
│   └── pages/                   # ページ固有CSS（home / projects / journal / about / contact / ai-examples）
├── js/
│   ├── nav.js                   # モバイルナビ開閉（全ページ共通）
│   ├── journal.js               # 記事データ配列 + タグフィルター描画（journal.html 専用）
│   └── contact.js               # フォームバリデーション（contact.html 専用）
├── images/                      # case_NN.png（事例サムネ）/ journal_*.png / screenshot_*.png など
└── docs/                        # spec.md / implementation_plan.md（初期設計資料）
```

### ページの2系統に注意

| 系統 | ページ | CSSの持ち方 |
|---|---|---|
| 通常ページ | index / projects / journal / about / contact / ai-examples | `css/` の共有CSSを `<link>` で読み込む |
| スタンドアロン | kindle-demo / process-materials-ds | **全CSSをインライン**で持つ独立ページ（ダークテーマ・共有CSSに依存しない） |
| ハイブリッド | ai-examples-showcase | 共有CSS + ページ内 `<style>` の大量の固有スタイル |

スタンドアロンページを編集する際、共有CSSのクラスは使えない（逆も同様）。

---

## デザイントークン（css/variables.css）

- ベース: `--color-base: #F9F9F9`（明るいグレー）/ アクセント: `--color-accent: #8B5A2B`（ブラウン）
- フォント: `--font-sans: 'Inter', 'Noto Sans JP', sans-serif`
- 余白: `--space-1`〜`--space-32`、角丸: `--radius-sm/md/lg`、影: `--shadow-sm/md/lg/hover`
- コンテンツ幅: `--content-max-width: 1100px`

通常ページに新規スタイルを書くときは必ずこのトークンを使う（生の色コード・pxを直書きしない）。

---

## ai-examples.html の構造（最重要ページ）

AI活用事例のカード一覧。カードは `<article class="case-card fade-in">` で、全25枚。
ページ末尾の**インライン `<script>`**（nav.js の後）がカテゴリ×ステータスの絞り込みを行う。

### カードのマークアップパターン

```html
<!-- NN. プロジェクト名（コメントで通し番号を維持） -->
<article class="case-card fade-in" data-category="学習システム" data-status="完成済み">
  <img class="case-card__thumb" src="images/case_NN.png" alt="...">
  <div class="case-card__header">
    <span class="tag">学習システム</span>              <!-- カテゴリ表示 -->
    <span class="case-ai-badge">Claude Code</span>     <!-- 使用AI -->
  </div>
  <h2 class="case-card__title">タイトル</h2>
  <p class="case-card__desc">説明文</p>
  <div class="case-card__tech"> <span class="tag">Python</span> ... </div>
  <div class="case-card__footer">
    <span class="case-status case-status--live">本番運用中</span>
    <a class="btn btn-outline" href="...">デモを見る</a>
    <a class="btn btn-outline" href="...">開発プロセスを見る</a>
    <a class="btn btn-outline" href="..." target="_blank" rel="noopener">詳細を見る</a>
  </div>
</article>
```

### data-category の値（フィルターボタンと完全一致させること・小文字表記に注意）

`webアプリ` / `ゲーム` / `pythonツール` / `学習システム` / `ナレッジ管理` / `aiスキル`

### ステータスの二重管理（両方を整合させること）

| バッジ表示（class → ラベル） | data-status（フィルター用） |
|---|---|
| `case-status--live` → 本番運用中 | `完成済み` |
| `case-status--done` → 完成 | `完成済み` |
| `case-status--active` → アクティブ開発中 | `開発中` |
| `case-status--wip` → 未完成 | `開発中` |

### ★ ステータス変更の絶対ルール

**プロジェクトのステータス（本番運用中/完成/開発中/未完成）をコードやフォルダの存在から推論して変更・断言してはならない。必ず本人（ユーザー）に確認する。**
過去に推論で「完成」と表示した4件がすべて「未完成」だった実績がある。デフォルトは保守的に「開発中」。

### フッターのボタン規約

- 本番運用中カード: 「デモを見る」（公開URL・`target="_blank"`）を先頭に置く
- 詳細ページがある場合: 「詳細を見る」（Notion等の外部リンク）
- サイト内資料がある場合: 相対リンク（例: `process-materials-ds.html`）で `target` なし

---

## ai-examples-showcase.html（グループ会用深掘りページ）

2事例を「概要 → 何を解決したか → ブラウザ風フレーム（スクショ） → 開発フロー（縦タイムライン）」で紹介。

- 事例01: 機械学習インタラクティブ教材自動生成システム（アクセント: パープル `--c1`）
  - 実物リンク: https://materials-ds.pages.dev/（フレーム下の「実際のサイトを開く ↗」）
  - 開発フロー直下に `process-materials-ds.html` への CTA ボタンあり
- 事例02: Kindleハイライト7層分析（アクセント: ティール系 `--c2`）
  - デモ: `kindle-demo.html`
- 固有スタイルはページ内 `<style>`（`.case-section` `.flow-row` `.browser-frame` `.toc-chip` 等）

---

## process-materials-ds.html（教材の開発プロセス資料）

materials-ds.pages.dev（ソース: `~/workspace/study/data_science`、GitHub `jiro0025/materials_ds`、Cloudflare Pages）
の作成プロセスをまとめたスタンドアロン資料。IBM Plex フォント・ダークテーマ・左固定ナビ・8セクション構成。

- 実際のフロー: 書籍PDF → Gemini完全抽出MD → chapter-N.json → gen_html.py → push → Cloudflare Pages
- **注意**: `/research-to-material`（Gemini 4観点調査）は教材リポジトリのREADMEに載っているが**実際には未使用**（本人確認済み）。この資料に含めないこと
- 導線: ai-examples.html カード18 と ai-examples-showcase.html 事例01 からリンクされている

---

## journal.html への記事追加

`js/journal.js` 冒頭の `articles` 配列にオブジェクトを1つ追記するだけ（HTMLは触らない）:

```js
{ id: N, title: '...', excerpt: '...', date: 'YYYY-MM-DD', tags: ['Development'], image: 'images/journal_xxx.png' }
```

---

## 編集時の注意まとめ

1. **ステータスは本人確認必須**（上記の絶対ルール）
2. カード追加時は `data-category` / `data-status` / バッジclass / フィルターボタンの整合を取る
3. 通常ページはデザイントークンを使用。スタンドアロンページは各ページ内で完結させる
4. 画像は `images/case_NN.png` の連番規約に従う（現状 case_01〜13, 18, 19 が存在。欠番あり）
5. commit / push は公開に直結するため、ユーザーの明示的な指示があってから行う
6. サイト構成を変えたら本 CLAUDE.md と README.md の Structure を更新する

## 関連リポジトリ・URL

| 対象 | 場所 |
|---|---|
| 本サイト公開 | https://jiro0025.github.io/demo_hp_site_advance_ver/ |
| 教材サイト | https://materials-ds.pages.dev/ ← `~/workspace/study/data_science`（別リポジトリ `materials_ds`） |
| 席替えツールデモ | https://tableshuffle-6ufrkloqygax2png4sebab.streamlit.app/ |
| マインドマップ | https://mindmap-app-livid.vercel.app/ |
