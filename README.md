# Data & Canvas — Portfolio & Journal

個人開発のポートフォリオ展示と、日々の学習・ライフスタイルを発信するWebサイトです。

🔗 **Live Demo:** [https://jiro0025.github.io/demo_hp_site_advance_ver/](https://jiro0025.github.io/demo_hp_site_advance_ver/)

---

## ✨ Features

- **Projects** — 開発したアプリケーション・ツールのポートフォリオ
- **Journal** — 開発記録、英語学習、カフェレビューなどの記事（タグフィルター付き）
- **About** — プロフィール・スキル紹介
- **Contact** — お問い合わせフォーム（クライアントサイドバリデーション）
- **レスポンシブ対応** — デスクトップ / タブレット / モバイル

## 🛠 Tech Stack

| 技術 | 用途 |
|---|---|
| HTML5 | 構造・セマンティクス |
| CSS3 (Vanilla) | デザインシステム・レスポンシブ |
| JavaScript (Vanilla) | ナビゲーション・フィルター・フォーム |
| Google Fonts | Inter / Noto Sans JP |
| GitHub Pages | ホスティング |

> フレームワーク・ビルドツール不要。ブラウザで直接開けます。

## 📁 Structure

```
├── index.html          # Home
├── projects.html       # Projects
├── journal.html        # Journal（タグフィルター付き）
├── about.html          # About
├── contact.html        # Contact
├── css/
│   ├── variables.css   # デザイントークン
│   ├── base.css        # リセット・ベーススタイル
│   ├── layout.css      # ヘッダー・フッター
│   ├── components.css  # カード・ボタン・タグ
│   └── pages/          # ページ固有スタイル
├── js/
│   ├── nav.js          # ナビゲーション・フェードイン
│   ├── journal.js      # 記事データ・タグフィルター
│   └── contact.js      # フォームバリデーション
└── images/             # サムネイル・背景画像
```

## 📝 記事の追加方法

`js/journal.js` の `articles` 配列にオブジェクトを追記するだけです：

```javascript
{
  id: 7,
  title: '記事タイトル',
  excerpt: '記事の概要',
  date: '2026-03-07',
  tags: ['Development'],
  image: 'images/your_image.png',
},
```

## 📄 License

MIT
