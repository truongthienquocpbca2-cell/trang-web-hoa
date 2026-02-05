// auth.js - File xử lý đăng nhập chung cho cả website

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});

// 1. Kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const user = localStorage.getItem('floraUser');
    const loginBtn = document.getElementById('login-btn-nav');
    const userMenu = document.getElementById('user-menu-btn'); // Nút avatar
    
    // Kiểm tra xem các phần tử có tồn tại trên trang này không (tránh lỗi null)
    if (!loginBtn || !userMenu) return; 

    if (user) {
        // ĐÃ ĐĂNG NHẬP
        const userData = JSON.parse(user);
        loginBtn.classList.add('hidden'); 
        userMenu.classList.remove('hidden'); 
        userMenu.style.display = 'flex'; // Đảm bảo hiển thị đúng kiểu flex
        
        // Cập nhật thông tin
        const nameDisplay = document.getElementById('user-name-display');
        const emailDisplay = document.getElementById('user-email-display');
        const avatar = document.getElementById('user-avatar');

        if(nameDisplay) nameDisplay.innerText = userData.name;
        if(emailDisplay) emailDisplay.innerText = userData.email;
        if(avatar) avatar.src = `https://ui-avatars.com/api/?name=${userData.name}&background=16a34a&color=fff`;
    } else {
        // CHƯA ĐĂNG NHẬP
        loginBtn.classList.remove('hidden');
        userMenu.classList.add('hidden');
        userMenu.style.display = 'none';
    }
}

// 2. Xử lý bật tắt Modal Login
function toggleLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
        } else {
            modal.classList.add('hidden');
        }
    }
}

// 3. Xử lý Đăng nhập
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    const namePart = email.split('@')[0];
    
    const userData = {
        email: email,
        name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
        isLoggedIn: true
    };

    localStorage.setItem('floraUser', JSON.stringify(userData));
    alert('Đăng nhập thành công!');
    toggleLoginModal();
    checkLoginStatus();
}

// 4. Xử lý Đăng xuất
function logout() {
    if(confirm('Bạn có chắc muốn đăng xuất?')) {
        localStorage.removeItem('floraUser');
        window.location.reload(); // Tải lại trang để cập nhật giao diện
    }
}

// 5. Xử lý Menu Dropdown (Click để mở)
function toggleUserMenu(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

// Đóng menu khi click ra ngoài
window.addEventListener('click', function(event) {
    const dropdown = document.getElementById('user-dropdown');
    const button = document.getElementById('user-menu-btn');
    if (dropdown && button && !dropdown.classList.contains('hidden')) {
        if (!dropdown.contains(event.target) && !button.contains(event.target)) {
            dropdown.classList.add('hidden');
        }
    }
});