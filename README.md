# three-js-se04-14
### project's guilder
 - [Bùi Sỹ Nguyên](https://www.facebook.com/groups/3090155857777168/user/614170901/)
### students
 - [Hồ Hải Đăng](https://github.com/hohaidangpro)
 - [Đỗ Minh Quang](https://github.com/QuangDo2311)

# How to use
### Exam1 model loading
- use your mouse to navigate, select option on GUI
### Exam2 model creating
- use mouse to naviagte, select mesh and changing that meshe position and rotation within the panel from the GUI
- press E to select
- press Q to quickly apply material
- you can download pose but only 1 at a time
- you can load all the poses (input2.txt)but remeber to add a name and have the exact format



# Features
### Both Exam
- will resize the window
- show performence
- orbit control. Shift+ leftmouse to move upward,downward, side to side. Leftmouse to rotate the camera. Middle mouse to zoom in/out


### Exam1 model loading
- you can rotate, size the model
- you can change the model
- you can change the model color
- you can see frame by frame, stop, play, accelerating animation speed
### Exam2 model creating
- selected mesh or mesh that under the pointer will have transparent material
- you can move, rotate the whole model or just the  selected mesh
- you can show individual wireframe or the whole mesh
- you can select individual texture (but if you want to select the same, you have to change it then reselect due to .onchange(), i will find a way to work around that soon)
- you can reset the whole thing for the model to be in it orginal form
- selected's material have extra options and color picker
- you can change background color
- selected mesh will have a box helper applying to it, so it will be a bit easier to see
- somewhat save and load poses
- light control : position, shadow, intensity, reset postion

### exam1 model loading test
![exam1_1](https://github.com/hohaidangpro/three-js-se04-14/blob/main/exam2_model_creating/promote%20images/exam1_1.png?raw=true)
### exam2 model creating test
![exam2_1.png](https://github.com/hohaidangpro/three-js-se04-14/blob/main/exam2_model_creating/promote%20images/exam2_1.png?raw=true)

### examples, sources
- [thank you]https://threejs.org/examples/
- [thank you]https://stackoverflow.com/questions/57328700/using-a-switch-statement-to-load-multiple-objects-in-three-js
- [thank you]https://github.com/PacktPublishing/Learn-Three.js-Third-Edition

### công nghệ 
-  tất cả các hình ảnh 3D được dựng lên bởi WebGL và ThreeJS
- WebGL (Web Graphics Library) đôi khi được hiểu đơn giản là 1 3D API. Thực tế thì WebGL là 1 rasterization engine (tạo các hình ảnh Raster). Nó sẽ vẽ các điểm, đường và tam giác theo code mà bạn viết. Vì vậy, làm việc với WebGL tức là bạn đưa code để WebGL sử dụng các điểm, đường và tam giác tạo nên những gì bạn muốn. WebGL là công cụ tạo 3D graphics(hình ảnh) ở low-level cho web, dựa trên OpenGL ES. WebGL là 1 plugins miễn phí tạo hình ảnh 3D trên browser cho web
- ThreeJS là thư viện JS sử dụng WebGl để vẽ 3D. Tức là WebGL sẽ build hình ảnh 3D dựa theo code ThreeJS của bạn để vẽ các điểm, đường và tam giác. ThreeJS giúp chúng ta tạo nên các hình ảnh 3D trên brower chỉ bằng JS mà không cần phải tại platform( nền tảng), application nào để người dùng có thể trải nghiệm hình ảnh 3D.
- ngoài ra còn sử dụng đến Canvas và hình ảnh Raster 
- Canvas là 1 phần tử của HTML5 sẽ được sử dụng làm trình kết xuất đồ họa cho ThreeJS
- hình ảnh Raster là các pixel( điểm ảnh) màu xếp cùng nhau tạo nên hình ảnh có màu sắc


