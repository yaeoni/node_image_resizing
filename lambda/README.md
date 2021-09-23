# Lambda 와 연결하기

0. lambda가 실행할 함수 작성
1. index.js , node_modules 폴더, pacakge.json, package-lock.json 파일 압축
2. AWS lambda 함수생성
3. 핸들러 이름은 반드시 파일이름.핸들러이름(ex. index.handler)로 설정!
4. 구성 -> 일반구성 -> 편집 속 실행역할 - AWS 정책 템플릿에서 새 역할 생성
5. 이름 아무거나 설정 & 정책 템플릿에서 Amazon S3 객체 읽기 전용 권한 추가
6. 트리거 추가 -> s3 / 버킷 설정 / 이벤트 : 모든 객체 생성 이벤트 / 접두사(어떤 폴더에 업로드된 사진을 리사이징 시킬건지) 설정

- 이때 typescript 로 작성한 경우 tsc 통해 js로 컴파일한다.

## 참고사항

### sharp 설치 시 아래의 옵션(리눅스 버전)으로 설치할 것

```bash
$ npm install --platform=linux --arch=x64 sharp
```

### lambda 테스트 꼭 해볼 것 !

- s3-put template 사용

```json
"s3": {
        "s3SchemaVersion": "1.0",
        "configurationId": "testConfigRule",
        "bucket": {
          "name": "자신의 버킷 이름", // 변경
          "ownerIdentity": {
            "principalId": "EXAMPLE"
          },
          "arn": "자신의 버킷 arn 복붙" // 변경
        },
        "object": {
          "key": "(s3에 업로드된) 테스트할 이미지 속성 중 key", // 변경
          "size": 1024,
          "eTag": "(s3에 업로드된) 테스트할 이미지 속성 중 eTag", // 변경
          "sequencer": "0A1B2C3D4E5F678901"
        }
      }
```

### 로그 확인 후 메모리 알맞게 조절

- 일반 구성 속 메모리 할당(기본 128MB는 많이 적었다.)
