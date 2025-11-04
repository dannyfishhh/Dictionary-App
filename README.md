<br />
<div align="center">

<h2 align="center" id="readme-top">Dictionary App</h2>

<p align="center">
A React app that integrates a free Dictionary API to search for definitions, examples and audio files for a given word. 
		
The app is thoroughly tested with Vitest and React-Testing-Library, and makes use of custom hooks and utility functions to keep the code clean and efficient. It is also responsively designed, and makes use of localStorage to persist the most recent search.
</p>

</div>

## Table of Contents
<details>
	<summary>Table of Contents</summary>
  	<ol>
	    <li><a href="#tech-stack">Tech Stack</a></li>
		<li><a href="#prerequisites">Prerequisites</a></li>
	    <li><a href="#project-structure">Project Structure</a></li>
	    <li><a href="#component-responsibilities">Component Responsibilities</a></li>
    	<li><a href="#contributing">Contributing</a></li>
    	<li><a href="#responsiveness">Responsiveness</a></li>
    	<li><a href="#testing">Testing</a></li>
    	<li><a href="#extras">Extras</a></li>
  	</ol>
</details>

## Tech Stack

- Vite — extremely fast set up time and dev server updates, which keeps the feedback loop short while developing.
- React — allows for fast and non-refreshing UX. 
- CSS Modules — all styles are scoped per component, preventing global-styling naming issues.
- Vitest + Testing Library — lightweight, fast unit and component tests (see `src/*/*.test.*`). Great for TDD and CI.
- react-error-boundary — allows for a catch-all method for handling unanticipated runtime errors in the UI.
- Yarn (package manager) — forces deterministic installs via its lockfile and historically reduces some cross-environment compatibility issues.

Why these choices: I chose yarn because it has caused fewer compatibility issues for me when I develop from a much older and 'travel-friendly' laptop. Vite is incredibly fast and has no additional set up for React or CSS Modules. Vitest also provides fast test execution and was easy to learn after Jest. It also integrates well with the react-testing-library I use.


## Prerequisites

Quick start — run locally

- Node.js. 

- Yarn is also recommended for contributors over npm to avoid dependency conflicts or lockfile mismatches. If you don't have Yarn installed you can install Yarn globally (for example via npm: `npm install -g yarn`).


Open a PowerShell terminal and run (Yarn preferred):

```powershell
yarn install
yarn dev
```

Then open the app at: http://localhost:5173

Other useful scripts:

```powershell
yarn test        # run unit/component tests with vitest

yarn build       # build for production

yarn preview     # preview the production build locally
```

## Project Structure

- `src/` — main source files
	- `components/` — each of the React UI components (each component has a folder containing a react `.jsx` file, css modules `.module.css` file, and testing `.test.jsx` files)
	- `helpers/` — all of the custom hooks, helper functions, and default results
	- `App.jsx`, `main.jsx` — entry point

## Component Responsibilities

- App — root of the app; read and renders initial state, and composes the UI accordingly to changing state (SearchBar, Results, Error boundary, Loading).
- SearchBar — an input with a submit button that makes a fetch call to the API via the `useResults` hook.
- Results — presents word-type and the definition, but also an example and audio button if such information is received from the API.
- Loading — a skeleton loading screen with pulse animation for when awaiting resolved promises from the fetch calls.
- Error — displays various error information if the returned object from the API call is rejected.
- helpers/apiFetch.js — performs the fetch request to the dictionary API and includes error handling. Also utilises `transformResults` for cleaner code in the Results component.
- helpers/useResults.jsx — orchestrates fetching, caching, and localStorage persistence and provides this to the App component (`apiFetch` and `useLocalStorage`).

## Contributing

1. Fork the repo and create a branch: `feature/your-short-desc`.
2. Run the project and tests locally. Please fix or add tests for any functionality or behaviour you change.
3. Open a pull request with a clear description of the change and why it would be beneficial to include.

## Responsiveness

The UI uses component-scoped CSS modules and responsive layout rules. It has been styled to adapt from larger computer screens down to small mobile devices (iPhone SE).

## Testing

Tests are written with Vitest and the Testing Library (see `src/**/*.test.*`). The test suite includes component tests that verify rendering and user interactions, plus helper tests for utility functions.

To run tests with Yarn:

```powershell
yarn test
```

## Extras

- Default search: the app shows the word 'joy' as a default because it makes me happy.

<p align="right">(<a href="#readme-top">back to top</a>)</p>