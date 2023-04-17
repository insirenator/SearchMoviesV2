import React from 'react';
// import useFetchData from '../utils/useFetchData';

const SearchItem = ({title, year, poster}) => {
	return (
		<div className="search-item">
			<img className="movie-poster" src={poster} alt="N/A"/>
			<p className="movie-title">{title}</p>
			<p className="movie-year">({year})</p>
		</div>
	);
}

const SearchList = ({seachItems}) => {

	const searchList = seachItems.map((item, idx) => {
		return <SearchItem key={idx} title={item.Title} year={item.Year} poster={item.Poster}/>
	});

	return (
		<div className="search-list">
			{searchList}
		</div>
	);
};

const SearchSection = () => {

	const [inputVal, setInputVal] = React.useState("");
	const [foundItems, setFoundItems] = React.useState({});
	const [errorMsg, setErrorMsg] = React.useState("");

	const handleClick = () => {
		console.log('Search Button clicked');
		console.log(inputVal);

		if (inputVal) {
			fetch(`https://www.omdbapi.com/?apikey=da4baaed&s=${inputVal}`)
				.then(res => res.json())
				.then(data => {
					console.log(data); 
					if (data.Response === "True") {
						setFoundItems(data)
						setErrorMsg("")
					}
					else {
						setFoundItems({});
						setErrorMsg("No Results Found! :(");
					}
				})
				.catch(err => console.log(`Error : ${err}`));			
		}

	}

	const handleInputChange = (event) => {
		setInputVal(event.target.value);
		// console.log(inputVal);
	}

	return (
		<div className="search-section">
			<div className="search-bar">
				<input 
					type="text"
					placeholder="Search Movie"
					className="search-input"
					onChange={handleInputChange}
				/>
				<span 
					className="material-icons search-icon"
					onClick={handleClick}>
					search
				</span>
			</div>

			{ errorMsg && <p>No Results Found! :(</p> }
			{ foundItems.Response === "True" && <SearchList seachItems={foundItems.Search}/> }  

		</div>
	);
}

export default SearchSection;