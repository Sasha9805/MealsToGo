import { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
	padding: ${(props) => props.theme.space[3]};
`;

export const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
	const { search, keyword } = useContext(LocationContext);
	const [searchKeyword, setSearchKeyword] = useState(keyword);

	useEffect(() => {
		setSearchKeyword(keyword);
	}, [keyword]);

	return (
		<SearchContainer>
			<Searchbar
				icon={isFavouritesToggled ? "heart" : "heart-outline"}
				placeholder="Search for a location"
				value={searchKeyword}
				onSubmitEditing={() => search(searchKeyword)}
				onChangeText={(text) => {
					setSearchKeyword(text);
				}}
				onIconPress={onFavouritesToggle}
				theme={{ roundness: 0 }}
			/>
		</SearchContainer>
	);
};
