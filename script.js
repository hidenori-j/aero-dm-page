document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニュートグル
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // タブ切り替え
    const tabButtons = document.querySelectorAll('.tab-button');
    const testimonialItems = document.querySelectorAll('.testimonial-item');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // アクティブなタブを更新
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // 選択されたカテゴリーに基づいてお客様の声を表示
                const category = this.getAttribute('data-category');
                
                testimonialItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // スムーススクロール
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // ナビゲーションメニューを閉じる（モバイル対応）
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 「もっと見る」ボタンの動作
    const moreButton = document.querySelector('.more-button a');
    if (moreButton) {
        moreButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 現在表示されていないテスティモニアルを表示
            const hiddenItems = document.querySelectorAll('.testimonial-item[style="display: none;"]');
            hiddenItems.forEach(item => {
                item.style.display = 'block';
            });
            
            // すべて表示されたらボタンを非表示
            if (hiddenItems.length > 0) {
                this.textContent = 'すべて表示しました';
                // ボタンを非活性化
                this.style.pointerEvents = 'none';
                this.style.opacity = '0.5';
            }
        });
    }

    // お問い合わせフォームのラジオボタン選択による表示切替
    const radioButtons = document.querySelectorAll('input[name="inquiry-type"]');
    const otherDetails = document.getElementById('other-details');

    if (radioButtons.length > 0 && otherDetails) {
        // 初期状態で「その他」が選択されていない場合はテキストエリアを非表示
        const isOtherSelected = document.querySelector('input[name="inquiry-type"][value="other"]').checked;
        otherDetails.style.display = isOtherSelected ? 'block' : 'none';

        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'other') {
                    otherDetails.style.display = 'block';
                } else {
                    otherDetails.style.display = 'none';
                }
            });
        });
    }
}); 