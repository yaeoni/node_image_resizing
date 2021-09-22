# node_image_resizing

## Flow

1. s3에 이미지를 올린다.
2. 해당 이미지를 리사이징(저화질 처리)하고, 다시 s3에 저장한다.
3. 2의 작업을 AWS lambda에 배포한다.

### 1. s3에 이미지 올
