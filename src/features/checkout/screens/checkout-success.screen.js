import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";

import { CartIcon, CartIconContainer } from "../components/checkout.styles";

export const CheckoutSuccessScreen = () => {
	return (
		<SafeArea>
			<CartIconContainer>
				<CartIcon icon="check-bold" />
				<Text variant="label">Success!</Text>
			</CartIconContainer>
		</SafeArea>
	);
};
