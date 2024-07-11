import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { MEALS } from "../Data/dummy-data";
import MeanlDetail from "../components/MealDetails";
import Subtitle from "../components/mealDetail/Subtitle";
import DetailList from "../components/mealDetail/DetailList";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/mealDetail/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";

const DetailsScreen = (route, navigation) => {
  const favoriteMealsCtx = useContext(FavoritesContext);

  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

  const ChangeFavoriteStatusHandler = () => {
    if (mealIsFavorite) favoriteMealsCtx.removeFavorite(mealId);
    else favoriteMealsCtx.addFavorite(id);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={ChangeFavoriteStatusHandler}
            icon={mealIsFavorite ? "white" : "star-outline"}
            color="white"
          />
        );
      },
    });
  }, [navigation, ChangeFavoriteStatusHandler]);
  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ url: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <View>
        <MeanlDetail
          affordability={selectedMeal.affordability}
          duration={selectedMeal.duration}
          complexity={selectedMeal.complexity}
          textStyle={styles.detailText}
        />
      </View>
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <DetailList list={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <DetailList list={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;
const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    with: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    margin8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listContainer: {
    width: "80%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
});
