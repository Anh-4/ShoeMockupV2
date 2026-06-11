# ShoeMockupV2

App desktop tạo mockup giày HD bằng AI (Google Gemini). Đóng gói `.exe`
chia sẻ được, **tự cập nhật qua GitHub** (mô hình "thin shell").

## Cách hoạt động

```
  bạn sửa code ──► git push ──► GitHub Actions ──► GitHub Pages (URL cố định)
                                                          ▲
                          ShoeMockupV2.exe (thin shell) tải URL này mỗi lần mở
```

- File `.exe` chỉ là cửa sổ desktop tải URL `https://anh-4.github.io/ShoeMockupV2/`.
- Cập nhật giao diện/tính năng (trong `src/`) ⇒ chỉ cần `git push`, **không gửi lại .exe**.
- Mất mạng / Pages lỗi ⇒ app tự dùng bản nhúng sẵn trong `.exe`.
- **API key**: mỗi người tự nhập (popup 🔑), lưu `localStorage`. KHÔNG nhúng vào build.

## Cài đặt 1 lần (đẩy lên GitHub)

```bash
cd "f:\Vani Ecom\Claude\shoe-app-copy"
git init
git add .
git commit -m "Shoe Mockup V2"
git branch -M main
git remote add origin https://github.com/Anh-4/ShoeMockupV2.git
git push -u origin main
```

Sau khi push: repo → **Settings → Pages → Source = GitHub Actions** (workflow
[.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) tự bật
& deploy). ~1–2 phút sau URL `https://anh-4.github.io/ShoeMockupV2/` sẽ sống.

## Chia sẻ .exe

Gửi `release/ShoeMockupV2-1.0.0-portable.exe` cho mọi người **một lần**. Lần đầu
Windows SmartScreen có thể cảnh báo (app chưa ký số) → *More info → Run anyway*.

> Chỉ build lại `.exe` khi đổi `APP_URL`, icon, hoặc logic trong `electron/main.cjs`.

## Vòng cập nhật về sau

```bash
# sửa code trong src/ ...
git add . && git commit -m "cập nhật X" && git push
```

Xong. Người dùng mở app lần sau là thấy bản mới.

## Lệnh dev / build

```bash
npm install
npm run dev        # chạy thử ở trình duyệt (localhost:5174)
npm run build      # build web → dist/
npm run dist:win   # build → release/ShoeMockupV2-*-portable.exe
```
