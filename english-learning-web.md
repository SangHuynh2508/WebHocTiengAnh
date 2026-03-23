# English Learning Web App - Implementation Plan

## Overview
Xây dựng web học tiếng Anh theo mô hình MVC. Dự án tập trung vào trải nghiệm người dùng (UX) tối giản (Minimalist), sạch sẽ (Clean) với hiệu năng cao. Cho phép người dùng đăng ký, học từ vựng/ngữ pháp, kiểm tra, tra cứu điểm và nghe phát âm sử dụng Web Speech API tĩnh.

## Project Type
**WEB** (Node.js/Express + EJS render)

## Success Criteria
- Hệ thống Node.js chạy port 3000 ổn định, kết nối MongoDB Local thành công.
- MVC chuẩn mực: Routes -> Controllers -> Models -> Views.
- Full 10 tính năng cốt lõi hoạt động đúng logic (Auth session an toàn).
- Giao diện EJS sạch, trực quan (Clean, Pro-Max UX), nút "Loa" (Web Speech API) thân thiện và có micro-interactions hút mắt.
- Tiến độ học tập cá nhân được lưu trữ, chấm điểm tự động chính xác hoàn toàn.

## Tech Stack
- Frontend: HTML5, CSS3, Vanilla JS (Web Speech API)
- Backend: Node.js, Express.js (express-session, cookie-parser, bcrypt)
- DB: MongoDB Local (Mongoose)
- View Engine: EJS
- Architecture: MVC Pattern

## File Structure
```text
/
├── controllers/          # Nhận Request, thao tác Model, gọi View
├── middlewares/          # Check Session/Auth
├── models/               # Định nghĩa Schema MongoDB
├── routes/               # Phân luồng API/Web
├── views/                # EJS Templates
│   ├── partials/         # Header/Footer
│   ├── auth/             # Login/Register
│   ├── study/            # Bài học, bài kiểm tra
│   └── dashboard/        # Hồ sơ, thống kê
├── public/               # Static Files
│   ├── css/              # Minimalist Styles
│   ├── js/             
│   │   └── audio.js      # Script Web Speech API
│   └── assets/           # Icos, images
├── config/               # db config
├── app.js               
└── package.json         
```

## Task Breakdown
- [ ] **Task 1: Cấu hình Init & Database (P0)** 
      *Agent:* `@backend-specialist` | *Skill:* `nodejs-best-practices`
      *INPUT -> OUTPUT:* Init `package.json`, install express/mongoose... Tạo server `app.js` và `config/db.js`.
      *VERIFY:* Chạy node/nodemon console in ra "MongoDB Local Connected".

- [ ] **Task 2: Thiết kế Models (P0)** 
      *Agent:* `@backend-specialist` | *Skill:* `database-design`
      *INPUT -> OUTPUT:* Cấu trúc User, Vocabulary, Grammar, Result/Progress.
      *VERIFY:* Code schema không có lỗi, export đúng.

- [ ] **Task 3: Auth System (P1)** 
      *Agent:* `@backend-specialist` | *Skill:* `security-auditor`
      *INPUT -> OUTPUT:* Routes `/register`, `/login`, mã hoá bcrypt, set Session. Controller `authController`.
      *VERIFY:* Create user -> DB lưu pass hash. Đăng nhập tạo cookies session. Đăng xuất destroy session.

- [ ] **Task 4: Build Giao diện Khung (EJS Layout) (P1)** 
      *Agent:* `@frontend-specialist` | *Skill:* `frontend-design`
      *INPUT -> OUTPUT:* EJS setup. partials/ header/footer. CSS minimalist với typography chuẩn. Form đăng ký đăng nhập hiện đại.
      *VERIFY:* Load page auth hiện UI Pro-max, UX không thừa thãi. Không dùng màu cấm (Purple/Violet).

- [ ] **Task 5: Hồ sơ cá nhân & Set Level (P2)** 
      *Agent:* `@backend-specialist` | *Skill:* `nodejs-best-practices`
      *INPUT -> OUTPUT:* User dashboard, profile update form. Chọn trình độ (Beginner/Inter/Advanced).
      *VERIFY:* Đổi trình độ xong f5 vẫn giữ nguyên (save in DB).

- [ ] **Task 6: Học Từ Vựng & Nút Audio (Web Speech API) (P1)** 
      *Agent:* `@frontend-specialist` 
      *INPUT -> OUTPUT:* View `vocabulary.ejs`. Nút speaker icon. File js client `audio.js` đọc Text-To-Speech. Database cung cấp sẵn từ tiếng Anh cần đọc.
      *VERIFY:* Ấn vào nút Loa -> trình duyệt dùng Voice đọc chuẩn từ vựng.

- [ ] **Task 7: Bài học Ngữ Pháp (P2)** 
      *Agent:* `@backend-specialist`
      *INPUT -> OUTPUT:* Route & Controller load dữ liệu bài ngữ pháp (điều kiện, thì, câu bị động) từ MongoDB.
      *VERIFY:* View hiện nội dung lý thuyết chính xác.

- [ ] **Task 8: Bài Kiểm Tra & Chấm Điểm (P1)** 
      *Agent:* `@backend-specialist` 
      *INPUT -> OUTPUT:* View test có form trắc nghiệm. Backend nhận submit form, count số câu đúng với đáp án ròng. Lưu điểm số vào User Progress.
      *VERIFY:* Submit test -> báo điểm ví dụ (8/10).

- [ ] **Task 9: Tracking Tiến Độ (P2)** 
      *Agent:* `@frontend-specialist`
      *INPUT -> OUTPUT:* View tiến độ, thống kê quá trình làm bài và bài đã học.
      *VERIFY:* Graph hoặc Process bar thể hiện thành tích hợp lý.

- [ ] **Task 10: Scripts & Audits (P3)** 
      *Agent:* `@orchestrator`
      *INPUT -> OUTPUT:* Chạy verify all linter, bugs security. Tối ưu UX/UI final touches.
      *VERIFY:* Pass all checklist.

## Phase X: Verification
- [ ] `npm run lint` hoặc fix code styling.
- [ ] Chạy `python .agent/skills/vulnerability-scanner/scripts/security_scan.py .`
- [ ] Chạy `python .agent/scripts/checklist.py .`
- [ ] Manual CSS Audit (Tuân thủ rule No Purple, Minimalist Focus).
