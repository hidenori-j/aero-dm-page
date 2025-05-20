# エアロシステム35M 特設サイト

このリポジトリは、エアロサービス株式会社の業務用空気清浄装置「エアロシステム35M」の特設サイトのソースコードを含んでいます。

## プロジェクト概要

このウェブサイトは、DMに掲載されたQRコードから訪問者がアクセスすることを想定しています。医療施設向けの高性能空気清浄装置「エアロシステム35M」の製品情報、性能データ、導入事例などを紹介し、問い合わせフォームを提供します。

## 技術スタック

- HTML5
- CSS3 (styles.css, logiq.css, results.css, レスポンシブデザイン)
- JavaScript (ES6)
- Font Awesome (アイコン)
- Chart.js (グラフ描画)

## ディレクトリ構造

```
/
├── index.html          # メインのHTMLファイル
├── css/                # スタイルシートディレクトリ
│   ├── styles.css      # 基本スタイルシート
│   ├── logiq.css       # Sony LOGIQ風デザインスタイルシート
│   └── results.css     # フレンドリーデザインスタイルシート
├── js/                 # JavaScriptファイルディレクトリ
│   └── script.js       # メインのJavaScriptファイル
├── images/             # 画像ファイル
│   ├── logo.png
│   ├── hero-bg.jpg
│   ├── product.png
│   ├── internal_yokota.png
│   ├── internal_fukuoka.png
│   ├── surgery_umeda.png
│   ├── surgery_oonari.png
│   ├── pediatrics_ogiso.png
│   ├── pediatrics_shimada.png
│   ├── gynecology_motoyawata.png
│   ├── otorhinolaryngology_seino.png
│   ├── otorhinolaryngology_kamata.png
│   ├── dermatology_harada.png
│   ├── dermatology_futakotamagawa.png
│   ├── ophthalmology_fujisawa.png
│   ├── dental_wada.png
│   ├── dental_takaoka.png
│   ├── dental_sako.png
│   └── dental_hotaruda.png
└── README.md           # このファイル
```

## 機能

- レスポンシブデザイン (モバイル、タブレット、デスクトップ対応)
- スムーズスクロール
- モバイルメニュートグル
- スクロールに応じたフェードインアニメーション
- お客様の声のタブ切り替えフィルタリング機能
- グラフ表示 (Chart.js)
- お問い合わせフォーム (ラジオボタン選択による表示切替含む)

## 実装スケジュール予定

1. HTMLマークアップの作成 ✓
2. CSSスタイリングの実装 ✓
3. JavaScriptの実装 ✓
4. 画像素材の準備 (一部不足の可能性あり。`images` ディレクトリを確認してください)
5. テスト・デバッグ
6. 本番環境へのデプロイ

## 使用方法

1. このリポジトリをクローンまたはダウンロードします
2. 必要な画像が `images` ディレクトリにすべて揃っているか確認し、不足分は配置します
3. Webサーバーにファイルをアップロードします
4. DMに掲載するQRコードからURLにリンクします

## 注意事項

- お問い合わせフォームの送信先PHPファイル (`submit-form.php`) は別途実装が必要です
- 実際のデプロイ前に、画像最適化を行うことをお勧めします
- `index.html` 内のお問い合わせ用の電話番号やメールアドレス (例: `03-XXXX-XXXX`, `info@aero-service.co.jp`) は実際の情報に更新してください
- `images` ディレクトリには、`index.html` で参照されている全ての画像ファイル (`logo.png`, `product.png` など多数) が必要です。不足している場合はサイトが正しく表示されません。 