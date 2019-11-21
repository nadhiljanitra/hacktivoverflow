# myHacktivoverflow-API

------

**Client URL:**

https://myhacktivoverflow.nadhiljanitra.xyz/

**Base URL:**

https://myhacktivoverflow-server.nadhiljanitra.xyz/

**User routes:**

| **Route**                 | **METHOD** | **Description**                 |
| :------------------------ | :--------- | :------------------------------ |
| /users/my-detail          | GET        | Get user data                   |
| /users/login              | POST       | Sign in user                    |
| /users/register           | POST       | Sign up new user                |
| /users/login/google       | POST       | Sign in using OAuth 2.0 Google  |
| /users/login/github       | POST       | Sign in using OAuth 2.0 Github  |
| /users/watchedTag         | PATCH      | Update user watched tag         |
| /users/remove-watched-tag | PATCH      | Update user watched tag(remove) |

**Questions routes:**

| **Route**                             | **HTTP** | **Description**                     |
| :------------------------------------ | :------- | :---------------------------------- |
| /questions                            | GET      | Get all questions                   |
| /questions/:questionId                | GET      | Get one question                    |
| /questions/byAuthor/:author           | GET      | Get all question by specific author |
| /questions                            | POST     | Create new question                 |
| /questions/search-tag                 | POST     | Search questions by tag input       |
| /questions/addUpvote/:questionId      | PATCH    | Upvote a question                   |
| /questions/removeUpvote/:questionId   | PATCH    | Remove upvote from question         |
| /questions/addDownvote/:questionId    | PATCH    | Downvote a question                 |
| /questions/removeDownvote/:questionId | PATCH    | Remove downvote from question       |
| /questions/:questionId                | PATCH    | Update a question                   |
| /questions/:questionId                | DELETE   | Delete a question                   |

**Answer routes:**

| **Route**                           | **HTTP** | **Description**                     |
| :---------------------------------- | :------- | :---------------------------------- |
| /answers                            | GET      | Get all answers                     |
| /answers/:answersId                 | GET      | Get one answer                      |
| /answers/:questionId                | GET      | Get all answer by specific question |
| /answers/addUpvote/:questionId      | PATCH    | Upvote an answer                    |
| /answers/removeUpvote/:questionId   | PATCH    | Remove upvote from answer           |
| /answers/addDownvote/:questionId    | PATCH    | Downvote an answer                  |
| /answers/removeDownvote/:questionId | PATCH    | Remove downvote from answer         |
| /answers/:answerId                  | PATCH    | Update an answer                    |
| /answers/:answerId                  | DELETE   | Delete an answer                    |



**Errors:**

| Code | Name                  | Description                                         |
| :--- | :-------------------- | :-------------------------------------------------- |
| 400  | Bad Request           | Invalid user's submitted data                       |
| 403  | Forbidden             | User not authorize to perform an action             |
| 404  | Not Found             | The requested resource could not be found           |
| 409  | Conflict              | Request could not be completed due to conflict data |
| 500  | Internal Server Error | We had a problem with our server                    |

## **Find User**

- **URL:** `/users/my-detail`

- **Method:** `GET`

- **URL Params:** none

- **URL Headers:** 

  - Required :
    - `token = [access_token]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        "username" : "admin"
        "email" : "admin@admin.com"
        "password" : "akdbUK^RDI@utfjnbe22.,damnd6$W&54s65ru"
        "loginWith": "web"
        "wathedTag": []
        "updatedAt": "2019-10-29T15:21:41.639Z",
        "createdAt": "2019-10-29T15:21:41.639Z"
    }
    ```
  
- **Error Response:**

  - **Status:** `404` **Content:**

    ```
        {
            "message": 'User not found'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
       axios({
            url: `/users/my-detail`,
            methods: "get",
            headers: {
              token
            }
          })
    ```

## **Register User**

- **URL:** `/users/register`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `email = [string]`
    - `username = [string]`
    - `password = [string]`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
        {
          token : "eyBcakj27gkasdwa.Kudg166tajshdamcnawdja2t78WUdsa.SVDcauy7ie"
        }
    ```
  
- **Error Response:**

  - **Status:** `409` **Content:**

    ```
        {
            "message": 'Email already in used'
        }
    ```
  
- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
            method: 'post',
            url : '/users/register',
            data : {
              username : this.usernameRegister,
              email : this.emailRegister,
              password : this.passwordRegister,
            }
          })
    ```

## 

## **Login User**

- **URL:** `/users/login`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `email = [string]`
    - `password = [string]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcyMzYzNzUwfQ.Gf0JAtSpcI1r5C6VHAlp-znvaFxJZL5b5pJ5gaCTrNs"
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
      {
            "message": 'Email/password wrong'
      }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
            method: 'post',
            url : '/users/login',
            data : {
              email : this.email,
              password : this.password,
            }
          })
    ```

## **Login Using Google OAuth**

- **URL:** `/users/login/google`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `token = [id_token Google]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcyMzYzNzUwfQ.Gf0JAtSpcI1r5C6VHAlp-znvaFxJZL5b5pJ5gaCTrNs"
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You've been signin with github'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
       axios({
              url : '/users/login/google',
              method : 'post',
              data : {
                id_token
              }
            })
    ```

## **Login Using Github OAuth**

- **URL:** `/users/login/github`

- **Method:** `POST`

- **URL Params:** 

  - Required :
    - `code = [code from OAuth Github]`

- **Data Params:** `none`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcyMzYzNzUwfQ.Gf0JAtSpcI1r5C6VHAlp-znvaFxJZL5b5pJ5gaCTrNs"
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You've been signin with google'
        }
    ```

## **Add New Watched Tag**

- **URL:** `/users/watchedTag`

- **Method:** `PATCH`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `tags = Array of String`
  
- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
    	'message' : 'watched tag updated!'
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize to perform this action'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
    axios({
              url: `/users/watchedTag`,
              method: 'patch',
              headers: {
                token: localStorage.getItem('token')
              },
              data: {
                tags: payload
              }
            })
    ```

## **Remove Watched Tag From User**

- **URL:** `/remove-watched-tag`

- **Method:** `PATCH`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `productName = [string]`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
    	'message' : 'Cart updated!'
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize to perform this action'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
     axios({
              url: `/users/remove-watched-tag`,
              method: 'patch',
              headers: {
                token: localStorage.getItem('token')
              },
              data: {
                tag: payload
              }
            })
    ```

## **Create new question**

- **URL:** `/questions`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `title = [string]`
    - `desc = [string]`
    - `tags = [string]`
  
- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
        _id: "5dc8532b25850d0da577ef31",
        "title": "ini title",
        "content": "ini content",
        "tags": "['nodejs',axios]",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        __v: 0
    }
    ```
  
- **Error Response:**

  - **Status:** `400` **Content:**

    ```
        {
            "message": 'Title is required'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
    axios({
              url: '/questions',
              method: 'post',
              headers: {
                token: localStorage.getItem('token')
              },
              data: {
                title: payload.title,
                content: payload.content,
                tags: payload.tags
              }
    ```

## **Get All Question**

- **URL:** `/questions`

- **Method:** `GET`

- **URL Params:** `none`

- **Data Params:** `none`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    [
      {
        _id: "5dc8532b25850d0da577ef31",
        "title": "ini title",
        "content": "ini content",
        "tags": "['nodejs',axios]",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        __v: 0
        }
    ]
    ```
  
- **Error Response:**

  - **Status:** `404` **Content:**

    ```
        {
            "message": 'Question not found'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
              url: '/questions',
              method: 'get'
            })
    ```

## **Get One Question**

- **URL:** `/questions/:questionId`

- **Method:** `GET`

- **URL Params:** `questionId`

- **Data Params:** `none`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        _id: "5dc8532b25850d0da577ef31",
        "title": "ini title",
        "content": "ini content",
        "tags": "['nodejs',axios]",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        __v: 0
        }
    ```
  
- **Error Response:**

  - **Status:** `404` **Content:**

    ```
        {
            "message": 'question not found'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
     axios({
              url: `/questions/${payload}`,
              method: 'get'
            })
    ```

- ## **Update a question**

  - **URL:** `/questions/:questionId`

  - **Method:** `PATCH`
  
  - **URL Params:** `questionId`
  
  - **Data Params:** 
  
    - Required : none
  
    - Optional :
  
      - `title = [string]`
      - `content = [string]`
      - `tags = [array of string]`
    
  - **URL Headers:** 
  
    - Required :
      - `token = access_token`
  
  - **Success Response:**
  
    - **Status:** `201` **Content:**
  
      ```
      {
          'message' : 'Question updated!'
      }
      ```
  
  - **Error Response:**
  
    - **Status:** `403` **Content:**
  
      ```
          {
              "message": 'You are not authorize to perform this action'
          }
      ```
  
  - **Sample call:**
  
    - **Using Axios:** 
  
      ```
       axios({
                url: `/questions/${payload.questionId}`,
                method: 'patch',
                headers: {
                  token: localStorage.getItem('token')
                },
                data: {
                  title: payload.title,
                  content: payload.content,
                  tags: payload.tags
                }
              })
      ```
  
  ## **Remove a question**
  
  - **URL:** `/questions/:questionId`
  
  - **Method:** `DELETE`
  
  - **URL Params:** `questionId`
  
  - **Data Params:** none
  
  - **URL Headers:** 
  
    - Required :
      - `token = access_token`
  
  - **Success Response:**
  
    - **Status:** `201` **Content:**
  
      ```
      {
          'message' : 'question deleted!'
      }
      ```
  
  - **Error Response:**
  
    - **Status:** `403` **Content:**
  
      ```
          {
              "message": 'You are not authorize to perform this action'
          }
      ```
  
  - **Sample call:**
  
    - **Using Axios:** 
  
      ```
      axios({
                url: `/questions/${payload}`,
                method: 'delete',
                headers: {
                  token: localStorage.getItem('token')
                }
              })
      ```

## **Upvote a question**

- **URL:** `/addUpvote/:questionId`

- **Method:** `PATCH`

- **URL Params:** `questionId`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
        'message' : 'Question updated!'
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize to perform this action'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
    axios({
              url: `/questions/${payload.type}/${payload.questionId}`,
              method: 'patch',
              headers: {
                token: localStorage.getItem('token')
              }
            })
    ```

## **Remove Upvote a question**

- **URL:** `/removeUpvote/:questionId`

- **Method:** `PATCH`

- **URL Params:** `questionId`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
        'message' : 'Question updated!'
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize to perform this action'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
    axios({
              url: `/questions/${payload.type}/${payload.questionId}`,
              method: 'patch',
              headers: {
                token: localStorage.getItem('token')
              }
            })
    ```

    

## **Create new answer**

- **URL:** `/answers/:questionId`

- **Method:** `POST`

- **URL Params:** `questionId`

- **Data Params:** 

  - Required :
    - `desc = [string]`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
        _id: "5dc8532b25850d0da577ef31",
        "questionId": "5dc8532b25850d0da577ef21",
        "content": "ini content",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        __v: 0
    }
    ```

- **Error Response:**

  - **Status:** `400` **Content:**

    ```
        {
            "message": 'Content is required'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
    axios({
              url: '/answers/:questionId',
              method: 'post',
              headers: {
                token: localStorage.getItem('token')
              },
              data: {
                title: payload.title,
                content: payload.content,
                tags: payload.tags
              }
    ```

## **Get One Answer**

- **URL:** `/questions/:answerId`

- **Method:** `GET`

- **URL Params:** `answerId`

- **Data Params:** `none`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        _id: "5dc8532b25850d0da577ef31",
        "questionId": "5dc8532b25850d0da577ef21",
        "content": "ini content",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        __v: 0
    }
    ```

- **Error Response:**

  - **Status:** `404` **Content:**

    ```
        {
            "message": 'anwer not found'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
     axios({
              url: `/answers/${payload}`,
              method: 'get'
            })
    ```

- ## **Update an answer**

  - **URL:** `/answers/:answerId`

  - **Method:** `PATCH`

  - **URL Params:** answerId`

  - **Data Params:** 

    - Required : none
    - Optional :
      - `content = [string]`

  - **URL Headers:** 

    - Required :
      - `token = access_token`

  - **Success Response:**

    - **Status:** `201` **Content:**

      ```
      {
          'message' : 'Answer updated!'
      }
      ```

  - **Error Response:**

    - **Status:** `403` **Content:**

      ```
          {
              "message": 'You are not authorize to perform this action'
          }
      ```

  - **Sample call:**

    - **Using Axios:** 

      ```
       axios({
                url: `/answers/${payload.questionId}`,
                method: 'patch',
                headers: {
                  token: localStorage.getItem('token')
                },
                data: {
                  content: payload.content,
                }
              })
      ```

  ## **Remove an answer**

  - **URL:** `/answers/:answerId`

  - **Method:** `DELETE`

  - **URL Params:** `answerId`

  - **Data Params:** none

  - **URL Headers:** 

    - Required :
      - `token = access_token`

  - **Success Response:**

    - **Status:** `201` **Content:**

      ```
      {
          'message' : 'answer deleted!'
      }
      ```

  - **Error Response:**

    - **Status:** `403` **Content:**

      ```
          {
              "message": 'You are not authorize to perform this action'
          }
      ```

  - **Sample call:**

    - **Using Axios:** 

      ```
      axios({
                url: `/answer/${payload}`,
                method: 'delete',
                headers: {
                  token: localStorage.getItem('token')
                }
              })
      ```

## **Upvote an Answer**

- **URL:** `/addUpvote/:answerId`

- **Method:** `PATCH`

- **URL Params:** `answerId`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
        'message' : 'Answer updated!'
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize to perform this action'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
    axios({
              url: `/answers/${payload.type}/${payload.questionId}`,
              method: 'patch',
              headers: {
                token: localStorage.getItem('token')
              }
            })
    ```

## **Remove Upvote an answers**

- **URL:** `/removeUpvote/:answerId`

- **Method:** `PATCH`

- **URL Params:** `answerId`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
        'message' : 'Answer updated!'
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize to perform this action'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
    axios({
              url: `/answers/${payload.type}/${payload.answerId}`,
              method: 'patch',
              headers: {
                token: localStorage.getItem('token')
              }
            })
    ```

    

