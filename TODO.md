Publish it
* Write article on medium

* Add exception handling 
  * Provide exception model in domain
  * Make working example in main app
  * resources
    https://blog.angular-university.io/rxjs-error-handling/

* On npm as separate packages with domain / data for use by all apps
  https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

* Have it in monorepo with core and several apps using it

Give following Presentation layers

* Web js
* Angular
* React
* Svelte
* Ionic
* Terminal UI nodejs app
  * https://github.com/druc/todo-cli
  * https://github.com/dalenguyen/todo-cli
  * api inspiration https://github.com/darrikonn/td-cli/blob/master/API.md
  * https://itnext.io/how-to-create-your-own-typescript-cli-with-node-js-1faf7095ef89
  * https://itnext.io/create-your-own-advanced-cli-with-typescript-5868ae3df397
  * https://www.youtube.com/watch?v=v2GKt39-LPA
  * https://github.com/SBoudrias/Inquirer.js
  * blessed nodejs library
* Desktop App via Electron
  * photon ui kit (macos look like)
  * microsoft fabric https://developer.microsoft.com/en-us/fabric#/controls/web/checkbox
  * tutorial on fabric with todo app step by step https://developer.microsoft.com/en-us/fabric#/get-started
  * integration with angular / react / vue


Provide alternative view frameworks

* Integration with just redux https://redux.js.org
  * todo app examples: https://redux.js.org/introduction/core-concepts
* RxJS + STATE streams (https://medium.com/angular-in-depth/angular-you-may-not-need-ngrx-e80546cc56ee)
* https://auth0.com/blog/ngrx-facades-pros-and-cons/
* Redux / MobX

* Firebase repo and authentication to todo
  https://www.freecodecamp.org/news/creating-a-crud-to-do-app-using-ionic-4/



Resources


*Other project i started*
https://github.com/benarso/angular-cleaner-architecture/blob/master/src/app/todo/presentation/presenter/todo-presenter.service.ts

*Tools to try*

Mono repos

https://nx.dev/angular/tutorial/01-create-application

https://nx.dev/angular/getting-started/getting-started

*From mail sent to myself*

https://github.com/rakshit444/news-sample-app

https://github.com/benarso/angular-cleaner-architecture/tree/master/src/app/todo/presentation

https://github.com/benarso/angular-cleaner-architecture/tree/master/src/app/todo/presentation

https://github.com/pnowak2/angular-architecture-ideas/blob/master/src/app/tutorial/data/repository/flexible-pokemon.repository.ts

https://github.com/pnowak2/angular-architecture-ideas/tree/master/src/app

https://jasonwatmore.com/post/2019/02/13/react-rxjs-communicating-between-components-with-observable-subject

*Opened Tabs*

https://www.toptal.com/android/benefits-of-clean-architecture-android

https://github.com/tomaszczura/location-registry/tree/master/app/src/main/java/com/astalos/locationregistry/domain

https://medium.com/@thegiraffeclub/angular-clean-architecture-approach-fcfe32e983a5

https://medium.com/intive-developers/approach-to-clean-architecture-in-angular-applications-hands-on-35145ceadc98?

https://github.com/im-a-giraffe/angular-clean-architecture/blob/master/src/app/presentation/elephant-card-list/elephant-card-list.component.ts

https://proandroiddev.com/multiple-ways-of-defining-clean-architecture-layers-bbb70afa5d4a

https://github.com/igorwojda/Android-Showcase#architecture

https://github.com/angularlicious/angular-architecture

https://github.com/JasonGT/CleanArchitecture

https://github.com/bufferapp/android-clean-architecture-boilerplate/tree/master/domain/src/main/java/org/buffer/android/boilerplate/domain

https://github.com/benarso/angular-cleaner-architecture/tree/master/src/app

https://github.com/phodal/clean-frontend/tree/master/src/app

https://www.codecademy.com/articles/react-setup-i


*Bookmarked to read later*

https://medium.com/@thegiraffeclub/angular-clean-architecture-approach-fcfe32e983a5

https://github.com/JasonGT/CleanArchitecture/tree/master/src/Application/Common

https://proandroiddev.com/multiple-ways-of-defining-clean-architecture-layers-bbb70afa5d4a

https://github.com/igorwojda/Android-Showcase#architecture

https://github.com/bufferapp/android-clean-architecture-boilerplate#architecture

https://github.com/angularlicious/angular-architecture

https://github.com/bufferapp/android-clean-architecture-boilerplate/tree/master/domain/src/main/java/org/buffer/android/boilerplate/domain/interactor

https://github.com/benarso/angular-cleaner-architecture/tree/master/src/app/core/domain

https://www.freecodecamp.org/news/a-typescript-stab-at-clean-architecture-b51fbb16a304/

https://www.toptal.com/android/benefits-of-clean-architecture-android

https://dev.to/phodal/clean-architecture-for-frontend-in-action-1aop

https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html


*Notes*

singleusecase, observableusecase
https://github.com/benarso/angular-cleaner-architecture/tree/master/src/app/core/domain

consider using viewmodel as models of view, separate from domain models
consider using presenter instead of facade

https://github.com/benarso/angular-cleaner-architecture/blob/master/src/app/todo/presentation/presenter/todo-presenter.service.ts


completable usecase idea of side effects run maybe ? (subscribes automatically)
https://github.com/bufferapp/android-clean-architecture-boilerplate/blob/master/domain/src/main/java/org/buffer/android/boilerplate/domain/interactor/CompletableUseCase.kt
