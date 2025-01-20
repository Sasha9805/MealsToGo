import { useState, useContext } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
	position: absolute;
	top: 40px;
	z-index: 999;
	width: 100%;
	padding: ${(props) => props.theme.space[3]};
`;

export const Search = () => {
	const { search, keyword } = useContext(LocationContext);
	const [searchKeyword, setSearchKeyword] = useState(keyword);

	return (
		<SearchContainer>
			<Searchbar
				placeholder="Search for a location"
				icon="map"
				value={searchKeyword}
				onSubmitEditing={() => search(searchKeyword)}
				onChangeText={(text) => {
					setSearchKeyword(text);
				}}
				theme={{ roundness: 0 }}
			/>
		</SearchContainer>
	);
};
