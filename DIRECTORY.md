# Directory 설명

각각의 디렉토리의 기본 설명 및 간략한 사용방법을 기술

## archetypes (option)

archetypes문서를 저장하고 있는 디렉토리로 Archetypes 는 Hugo CLI를 이용하여 문서를 생성할 때 사용하는 컨텐츠 템필릿 파일로 미리 구성된 머리말, 웹사이트 컨텐츠 유형에 대한 컨텐츠 배치를 포함.

> **Important:** 해당 디렉토리는 hugo cli를 이용하여 문서를 만들때만 사용되므로 별도 생성하지 않아도 된다.

```sh
$ hugo new posts/my-first-post.md
```

위와 같이 문서를 생성할 경우 다음과 같은 순서로 Archetypes파일을 참고하여 문서를 생성한다.

1. `archetypes/posts.md`
2. `archetypes/default.md`
3. `themes/my-theme/archetypes/posts.md`
4. `themes/my-theme/archetypes/default.md`

## assets

Hugo Pipes에 의하여 처리해야 하는 모든 파일을 저장

> **Important:** .Permalink / .RelPermalink이 사용된 파일만  public폴더에 Published된다.

## config (option)

Hugo 는 많은 수의 구성 지시문으로 구성되는데 이를 관리할 수 있는 폴더

> **Important:** 일반적으로는 root에 config.toml만을 이용하여 간단히 설정할 수 도 있으므로 일반적으로 단일한 구성으로 진행한다.

## contents

웹사이트의 모든 컨텐츠가 저장되는 폴더로 각각의 상위 폴더는 Hugo에서 content section으로 간주한다.

## data

웹사이트를 생성할 때 Hugo에서 사용할 수 있는 구성 파일을 저장하는데 사용함.

yaml,json, toml형식으로 작성할 수 있다. 이폴더에 추가하는 파일외에도 동적 컨텐츠에서 가져오는 데이터 템플릿을 만들 수 도 있다.

## layouts

정적 웹 사이트로 렌더링되는 특정 컨텐츠의 표시를 위한 .html 파일 형식의 템플릿을 저장하는 공간

## statics

이미지, CSS, JavaScript 등 모든 정적 콘텐츠를 저장. Hugo가 사이트를 생성할때 본 디렉토리의 모든 자산을 그대로 복사합니다.

## functions (?)

Cloudflare의 자체 사용함수인지는 잘 모르겠으나 Hugo에는 언급되지 않았다.

## bin (?)

Cloudflare의 자체 사용함수인지는 잘 모르겠으나 Hugo에는 언급되지 않았다.

## public (Target폴더)

Hogo에 의하여 정적 웹사이트 컨텐츠를 생성하는 공

## resources (사이트 빌드시 사용되는 temp)

웹사이트 생성속도를 향상하기 위한 일부 캐쉬파일을 저장하는 공간으로 기본 생성되지는 않는다.

## 

