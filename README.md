#VIE
# Three-js-se04-14
### Giáo viên hướng dẫn
 - [Bùi Sỹ Nguyên](https://www.facebook.com/groups/3090155857777168/user/614170901/)
### Học Sinh
 - [Hồ Hải Đăng](https://github.com/hohaidangpro)
 - [Đỗ Minh Quang](https://github.com/QuangDo2311)

# Hướng dẫn sử dụng
### Exam1 model loading
- sử dụng chuột để di chuyển camera và sửa đổi tùy chọn
### Exam2 model creating
- sử dụng chuột như Exam1
- ấn E để chọn bộ phận
- ấn Q để phân nhanh vật liệu cho bộ phận
- có thể tải dữ liệu tạo dáng để thêm vào input2.txt nhưng chỉ tải thông tin về pose hiện tải
- có thể tải lên tất cả các dáng (trong input2.txt)nhưng nhớ thêm tên vào đầu mỗi dữ liệu



# Các chức năng
### Cả hai chương trình
- sẽ điều chỉnh cửa sổ theo người dùng
- cho người dùng biết về hiện trạng hoạt động
- sử dụng thư viện OrbitControl giúp việc di chuyển camera bằng chuột dễ hơn. Shift+ leftmouse để di chuyển dạng 2D. Giữ leftmouse để xoay camera và chuột giữa để phóng to, thu nhỏ


### Exam1 model loading
- xoay, chỉnh kích thước model
- thay đổi model(hiện giờ có 2)
- thay đổi màu của model
- thực hiện hiệu chỉnh cơ bản với hoạt ảnh của model như tăng, giảm tốc, độ nặng của skeleton, dừng khung hình, chạy ....
### Exam2 model creating
- chọn bộ phận và hiệu chỉnh nó như: màu, vật liệu, vị trí, độ xoay.
- di chuyển, xoay, reset lại vị trí của cả model
- hiện wireframe của một bộ phận hoặc cả mô hình
- thay đổi màu của background (scene)
- áp vật liệu lên bộ phận được trọn, nếu muốn cho bộ phận khác cùng vật liệu bấm Q vào nó (do dat.gui.js không có chức năng hiệu chỉnh .listen(), nên để đi đường chính rất tốn thời gian)
- bộ phận được chọn xẽ có một hộp màu xanh bao trọn
- khá là gần lưu trữ và tải lên pose
- điều chỉnh ánh sáng: độ mạnh, vị trí, reset

### Exam1 model loading test
![exam1_1](https://github.com/hohaidangpro/three-js-se04-14/blob/main/exam2_model_creating/promote%20images/exam1_1.png?raw=true)
### Exam2 model creating test
![exam2_1.png](https://github.com/hohaidangpro/three-js-se04-14/blob/main/exam2_model_creating/promote%20images/exam2_1.png?raw=true)

### Examples, sources
- [cảm ơn]https://threejs.org/examples/
- [cảm ơn]]https://stackoverflow.com/questions/57328700/using-a-switch-statement-to-load-multiple-objects-in-three-js
- [cảm ơn]]https://github.com/PacktPublishing/Learn-Three.js-Third-Edition

### Công nghệ 
-  tất cả các hình ảnh 3D được dựng lên bởi WebGL và ThreeJS
- WebGL (Web Graphics Library) đôi khi được hiểu đơn giản là 1 3D API. Thực tế thì WebGL là 1 rasterization engine (tạo các hình ảnh Raster). Nó sẽ vẽ các điểm, đường và tam giác theo code mà bạn viết. Vì vậy, làm việc với WebGL tức là bạn đưa code để WebGL sử dụng các điểm, đường và tam giác tạo nên những gì bạn muốn. WebGL là công cụ tạo 3D graphics(hình ảnh) ở low-level cho web, dựa trên OpenGL ES. WebGL là 1 plugins miễn phí tạo hình ảnh 3D trên browser cho web
- ThreeJS là thư viện JS sử dụng WebGl để vẽ 3D. Tức là WebGL sẽ build hình ảnh 3D dựa theo code ThreeJS của bạn để vẽ các điểm, đường và tam giác. ThreeJS giúp chúng ta tạo nên các hình ảnh 3D trên brower chỉ bằng JS mà không cần phải tại platform( nền tảng), application nào để người dùng có thể trải nghiệm hình ảnh 3D.
- ngoài ra còn sử dụng đến Canvas và hình ảnh Raster 
- Canvas là 1 phần tử của HTML5 sẽ được sử dụng làm trình kết xuất đồ họa cho ThreeJS
- hình ảnh Raster là các pixel( điểm ảnh) màu xếp cùng nhau tạo nên hình ảnh có màu sắc

### Hướng dẫn cài đặt
- tải về
- cài thêm phần mềm tạo server ảo
- chạy index.html ở thư mục exam


