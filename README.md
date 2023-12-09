# Vue 3 + TypeScript + Vite + Vuetify + Axios & Vitest for Star Wars API integration

## Procedure & Metodology.

I have built a Vue 3 project with Vite, TypeScript, Vuetify, Axios, & Vitest for Star Wars API integration.
Leveraged Vuex for state management & custom store handling in tests. Now im going to respond the questions at the
end of the challege.

## Final challenge questions.

*** What's a closure? Where in the code is there a closure?
- A closure is a function that has access to its own scope, the outer (enclosing) function's scope, and the global scope.
- In the code provided, there is a closure in the test code where the customStore object is defined inside the describe block but is accessed within the it block.
- You may find another closure in the PlanetModule.ts line 77 where the getPlanetCharacters function is defined inside the filteredResults method.

*** Which are the potential side-effects in any function? Could you point out any of these cases in
your code? Are they expected? Can they be avoided?
- Potential side-effects in any function can include network requests, file I/O, database updates, and more. In the code, a potential side-effect is the axios.get call to fetch data from an external API within the Vuex store action. These side-effects are expected in this context because it's fetching data from an API. They can be avoided in tests by using mock data or stubbing the network request.
