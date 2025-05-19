document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニュートグル
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // スクロールアニメーション
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // product-text要素を監視
    const productText = document.querySelector('.product-text');
    if (productText) {
        productText.classList.remove('fade-in-up'); // 最初に削除しておく
        observer.observe(productText);
    }

    // アニメーション要素に遅延を適用
    const animateElements = document.querySelectorAll('.section-title, .product-image, .feature, .hospital_block, .contact-info, .contact-form');
    
    if (animateElements.length > 0) {
        animateElements.forEach((element, index) => {
            element.classList.add('fade-in-up');
            element.style.animationDelay = `${index * 0.1}s`;
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
                        
                        // アニメーション効果を追加
                        setTimeout(() => {
                            item.classList.add('fade-in-up');
                        }, 50);
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('fade-in-up');
                    }
                });
            });
        });

        // 初期表示として、active クラスの付いたタブをクリックした状態にする
        const defaultActiveButton = document.querySelector('.tab-button.active');
        if (defaultActiveButton) {
            defaultActiveButton.click();
        }
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
            let delay = 0;
            
            hiddenItems.forEach(item => {
                setTimeout(() => {
                    item.style.display = 'block';
                    item.classList.add('fade-in-up');
                }, delay);
                delay += 100; // 各要素に100msの遅延
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
                    otherDetails.classList.add('fade-in-up');
                } else {
                    otherDetails.style.display = 'none';
                    otherDetails.classList.remove('fade-in-up');
                }
            });
        });
    }
}); 