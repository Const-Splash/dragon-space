// lookingTitleBar.js
// 标题栏：我盯着你呢 (The Eye of the TitleBar)

const titleBar = document.querySelector('.TitleBar');
let lastScrollY = window.scrollY;
let ticking = false;

// 核心逻辑：判断滚动方向
function updateTitleBar() {
    const currentScrollY = window.scrollY;
    
    // 1. 向下滚超过 60px -> 标题栏隐身 (transform 上移)
    if (currentScrollY > lastScrollY && currentScrollY > 60) {
        titleBar.classList.add('is-hidden');
        // 可选：如果标题栏有logo，加个缩小动画
        // titleBar.querySelector('.TitleBar_logo').style.transform = 'scale(0.8)';
    } 
    // 2. 向上滚 -> 标题栏现身
    else {
        titleBar.classList.remove('is-hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

// 监听滚动，用 requestAnimationFrame 优化性能，不让页面卡顿
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateTitleBar();
        });
        ticking = true;
    }
});

// 3. 鼠标靠近屏幕顶部时强制显示 (这才是 "Looking" 的精髓！)
document.addEventListener('mousemove', (e) => {
    // 如果鼠标在顶部 50px 范围内，且标题栏是隐藏状态
    if (e.clientY < 50 && titleBar.classList.contains('is-hidden')) {
        titleBar.classList.remove('is-hidden');
    }
});
