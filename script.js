document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニュートグル
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // グラデーション背景の作成関数 (共通スコープに移動)
    const createGradient = (ctx, startColor, endColor) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height); // canvasの高さに応じてグラデーションを調整
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, endColor);
        return gradient;
    };

    // ウイルス除去性能グラフの描画
    const virusChartCanvas = document.getElementById('virusRemovalChart');
    if (virusChartCanvas) {
        // グラフデータ
        const labels = [0, 5, 10, 15, 20];
        const naturalDecayData = [5.89, 5.81, 5.74, 5.66, 5.58];
        const operationData = [5.99, 4.98, 3.97, 2.97, 1.96];

        const ctx = virusChartCanvas.getContext('2d');
        
        // グラデーション定義
        const naturalDecayGradient = createGradient(ctx, 'rgba(180, 180, 180, 0.2)', 'rgba(180, 180, 180, 0.01)'); // 自然減衰を薄く
        const operationGradient = createGradient(ctx, 'rgba(52, 152, 219, 0.6)', 'rgba(52, 152, 219, 0.15)'); // 作動効果を明確に

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '自然減衰',
                        data: naturalDecayData,
                        borderColor: 'rgba(170, 170, 170, 1)', // やや薄いグレー
                        backgroundColor: naturalDecayGradient,
                        borderWidth: 2.5,
                        borderDash: [6, 3], // 破線にして補助的な印象に
                        tension: 0.4,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        pointBackgroundColor: 'rgba(170, 170, 170, 1)',
                        pointBorderColor: 'rgba(255, 255, 255, 0.8)',
                        pointBorderWidth: 1.5,
                        fill: true,
                        pointStyle: 'circle',
                        pointHoverStyle: 'rectRounded',
                    },
                    {
                        label: '作動',
                        data: operationData,
                        borderColor: 'rgba(31, 118, 180, 1)', // より濃い、はっきりした青
                        backgroundColor: operationGradient,
                        borderWidth: 3.5, // 作動ラインを少し太く
                        tension: 0.4,
                        pointRadius: (context) => context.dataIndex === operationData.length - 1 ? 9 : 6, // 最後のポイントをさらに大きく
                        pointHoverRadius: (context) => context.dataIndex === operationData.length - 1 ? 13 : 9,
                        pointBackgroundColor: 'rgba(31, 118, 180, 1)',
                        pointBorderColor: 'rgba(255, 255, 255, 1)',
                        pointBorderWidth: 2,
                        fill: true,
                        pointStyle: (context) => context.dataIndex === operationData.length - 1 ? 'star' : 'circle',
                        pointHoverStyle: 'rectRounded',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2,
                        shadowBlur: 5,
                        shadowColor: 'rgba(31, 118, 180, 0.3)' // 作動ラインに影を追加して立体感を
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                animations: {
                    duration: 800, // 全体のアニメーション時間を少し短縮
                    easing: 'easeOutCubic', // スムーズなイージング
                    delay: (context) => { // データセットごとの遅延で順番に表示
                        let delay = 0;
                        if (context.type === 'dataset') {
                            delay = context.datasetIndex * 250;
                        }
                        return delay;
                    },
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(10, 25, 40, 0.88)', // 少し濃い背景で可読性向上
                        titleFont: {
                            size: 15,
                            weight: 'bold',
                        },
                        bodyFont: {
                            size: 14,
                        },
                        padding: 15,
                        cornerRadius: 8,
                        caretSize: 8,
                        displayColors: true,
                        borderColor: 'rgba(255,255,255,0.25)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.parsed.y.toFixed(2) + ' (対数値)';
                                if (context.dataset.label === '作動' && context.dataIndex === operationData.length - 1) {
                                    label += ' ✨ 大幅除去！'; // 強調テキスト変更
                                }
                                return label;
                            },
                            title: function(tooltipItems) {
                                return `作動時間: ${tooltipItems[0].label}分`;
                            }
                        }
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 18,
                            padding: 25,
                            font: {
                                size: 15,
                                weight: 'bold'
                            },
                            usePointStyle: true,
                            pointStyle: 'circle',
                            color: '#2c3e50' // 凡例の文字色を濃く
                        },
                        onHover: (event, legendItem, legend) => {
                            const index = legendItem.datasetIndex;
                            const ci = legend.chart;
                            ci.data.datasets.forEach((dataset, i) => {
                                const meta = ci.getDatasetMeta(i);
                                meta.dataset.borderWidth = (i === index && !legendItem.hidden) ? 4.5 : 3;
                                meta.dataset.shadowBlur = (i === index && !legendItem.hidden) ? 10 : (dataset.label === '作動' ? 5 : 0);
                            });
                            ci.update();
                        },
                        onLeave: (event, legendItem, legend) => {
                            const ci = legend.chart;
                            ci.data.datasets.forEach((dataset, i) => {
                                const meta = ci.getDatasetMeta(i);
                                meta.dataset.borderWidth = (dataset.label === '作動') ? 3.5 : 2.5;
                                meta.dataset.shadowBlur = (dataset.label === '作動') ? 5 : 0;
                            });
                            ci.update();
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: '作動時間 (min)',
                            font: {
                                size: 17,
                                weight: 'bold'
                            },
                            padding: {top: 15, bottom: 10},
                            color: '#2c3e50'
                        },
                        grid: {
                            display: true,
                            color: 'rgba(200, 220, 240, 0.4)', // グリッド線を少し濃く
                            lineWidth: 1
                        },
                        ticks: {
                            font: {
                                size: 14
                            },
                            padding: 12,
                            color: '#34495e'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '浮遊ウイルス濃度（対数値）',
                            font: {
                                size: 17,
                                weight: 'bold'
                            },
                            padding: {top: 10, bottom: 15},
                            color: '#2c3e50'
                        },
                        min: 0,
                        max: 7,
                        ticks: {
                            stepSize: 1,
                            font: {
                                size: 14
                            },
                            padding: 12,
                            color: '#34495e'
                        },
                        grid: {
                            display: true,
                            color: 'rgba(200, 220, 240, 0.4)', // グリッド線を少し濃く
                            drawBorder: false,
                            lineWidth: 1
                        }
                    }
                }
            }
        });
    }

    // 花粉除去性能グラフの描画
    const pollenChartCanvas = document.getElementById('pollenRemovalChart');
    if (pollenChartCanvas) {
        const labelsPollen = [0, 5, 10, 15, 20, 25];
        const naturalDecayDataPollen = [1010.2, 985.26, 960.93, 937.21, 914.07, 891.5];
        const operationDataPollen = [496.36, 81.23, 13.29, 2.18, 0.36, 0.06];

        const ctxPollen = pollenChartCanvas.getContext('2d');

        // グラデーション定義 (createGradient関数はウイルスグラフのものを再利用想定)
        const naturalDecayGradientPollen = createGradient(ctxPollen, 'rgba(180, 180, 180, 0.2)', 'rgba(180, 180, 180, 0.01)');
        const operationGradientPollen = createGradient(ctxPollen, 'rgba(76, 175, 80, 0.5)', 'rgba(76, 175, 80, 0.1)'); // Green for pollen

        new Chart(ctxPollen, {
            type: 'line',
            data: {
                labels: labelsPollen,
                datasets: [
                    {
                        label: '自然減衰',
                        data: naturalDecayDataPollen,
                        borderColor: 'rgba(170, 170, 170, 1)',
                        backgroundColor: naturalDecayGradientPollen,
                        borderWidth: 2.5,
                        borderDash: [6, 3],
                        tension: 0.4,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        pointBackgroundColor: 'rgba(170, 170, 170, 1)',
                        pointBorderColor: 'rgba(255, 255, 255, 0.8)',
                        pointBorderWidth: 1.5,
                        fill: true,
                        pointStyle: 'circle',
                    },
                    {
                        label: '作動',
                        data: operationDataPollen,
                        borderColor: 'rgba(66, 160, 70, 1)', // Darker green for line
                        backgroundColor: operationGradientPollen,
                        borderWidth: 3.5,
                        tension: 0.4,
                        pointRadius: (context) => context.dataIndex === operationDataPollen.length - 1 ? 9 : 6,
                        pointHoverRadius: (context) => context.dataIndex === operationDataPollen.length - 1 ? 13 : 9,
                        pointBackgroundColor: 'rgba(66, 160, 70, 1)',
                        pointBorderColor: 'rgba(255, 255, 255, 1)',
                        pointBorderWidth: 2,
                        fill: true,
                        pointStyle: (context) => context.dataIndex === operationDataPollen.length - 1 ? 'star' : 'circle',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2,
                        shadowBlur: 5,
                        shadowColor: 'rgba(76, 175, 80, 0.3)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                animations: {
                    duration: 800,
                    easing: 'easeOutCubic',
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'dataset') {
                            delay = context.datasetIndex * 250;
                        }
                        return delay;
                    },
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(10, 25, 40, 0.88)',
                        titleFont: { size: 15, weight: 'bold' },
                        bodyFont: { size: 14 },
                        padding: 15,
                        cornerRadius: 8,
                        caretSize: 8,
                        displayColors: true,
                        borderColor: 'rgba(255,255,255,0.25)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) { label += ': '; }
                                label += context.parsed.y.toFixed(2) + ' ng/m³';
                                if (context.dataset.label === '作動' && context.dataIndex === operationDataPollen.length - 1) {
                                    label += ' ✨ 検出限界以下！';
                                }
                                return label;
                            },
                            title: function(tooltipItems) {
                                return `作動時間: ${tooltipItems[0].label}分`;
                            }
                        }
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 18,
                            padding: 25,
                            font: { size: 15, weight: 'bold' },
                            usePointStyle: true,
                            pointStyle: 'circle',
                            color: '#2c3e50'
                        },
                        onHover: (event, legendItem, legend) => {
                            const index = legendItem.datasetIndex;
                            const ci = legend.chart;
                            ci.data.datasets.forEach((dataset, i) => {
                                const meta = ci.getDatasetMeta(i);
                                meta.dataset.borderWidth = (i === index && !legendItem.hidden) ? 4.5 : ((dataset.label === '作動') ? 3.5 : 2.5);
                                meta.dataset.shadowBlur = (i === index && !legendItem.hidden && dataset.label === '作動') ? 10 : (dataset.label === '作動' ? 5 : 0);
                            });
                            ci.update();
                        },
                        onLeave: (event, legendItem, legend) => {
                            const ci = legend.chart;
                            ci.data.datasets.forEach((dataset, i) => {
                                const meta = ci.getDatasetMeta(i);
                                meta.dataset.borderWidth = (dataset.label === '作動') ? 3.5 : 2.5;
                                meta.dataset.shadowBlur = (dataset.label === '作動' && dataset.shadowColor) ? 5 : 0;
                            });
                            ci.update();
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: '作動時間 (min)',
                            font: { size: 17, weight: 'bold' },
                            padding: {top: 15, bottom: 10},
                            color: '#2c3e50'
                        },
                        grid: { display: true, color: 'rgba(200, 220, 240, 0.4)', lineWidth: 1 },
                        ticks: { font: { size: 14 }, padding: 12, color: '#34495e' }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '花粉濃度 (ng/m³)',
                            font: { size: 17, weight: 'bold' },
                            padding: {top: 10, bottom: 15},
                            color: '#2c3e50'
                        },
                        min: 0,
                        suggestedMax: 1100, // データに基づいて適切な最大値を設定
                        ticks: {
                            font: { size: 14 }, 
                            padding: 12, 
                            color: '#34495e' 
                        },
                        grid: { display: true, color: 'rgba(200, 220, 240, 0.4)', drawBorder: false, lineWidth: 1 }
                    }
                }
            }
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