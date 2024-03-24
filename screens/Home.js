import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "react-native-vector-icons/FontAwesome";
import { SliderBox } from "react-native-image-slider-box";
import Trendingcard from "../components/Trendingcard";
import Newcollection from "../components/Newcollection";
import { useNavigation } from "@react-navigation/native";

const images1 = [
  require("../assets/1.jpg"),
  require("../assets/2.jpg"),
  require("../assets/3.jpg"),
];
const items = [
  { id: 1, image: require("../assets/11.jpg"), text: "Men", key: "men_all" },
  {
    id: 2,
    image: require("../assets/22.jpg"),
    text: "Woman",
    key: "ladies_all",
  },
  {
    id: 3,
    image: require("../assets/33.jpg"),
    text: "Baby",
    key: "kids_newbornbaby_viewall",
  },
  { id: 4, image: require("../assets/44.jpg"), text: "Kids", key: "kids_all" },
  {
    id: 5,
    image: require("../assets/55.jpg"),
    text: "Sport",
    key: "sportswear",
  },
  { id: 6, image: require("../assets/66.jpg"), text: "Home", key: "home_all" },
];

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [Trending1, setTrending1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list",
        params: {
          country: "in",
          lang: "en",
          currentpage: "0",
          pagesize: "16",
          categories: "home_all",
        },
        headers: {
          "X-RapidAPI-Key":
            "e982043e32mshded2985d7f3ed00p1be005jsn47d9ba0e95c0",
          "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setProducts(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list",
        params: {
          country: "in",
          lang: "en",
          currentpage: "0",
          pagesize: "6",
          categories: "men_all",
          concepts: "H&M MAN",
        },
        headers: {
          "X-RapidAPI-Key":
            "e982043e32mshded2985d7f3ed00p1be005jsn47d9ba0e95c0",
          "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setTrending1(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topC}>
          <Image
            style={styles.topI}
            source={require("../assets/home-icon.png")}
          />
          <Image
            style={styles.topI2}
            source={require("../assets/home-search.png")}
          />
        </View>

        <SliderBox
          images={images1}
          style={styles.carousel}
          dotColor="#476DFF"
          inactiveDotColor="#ffffff"
          autoplay={true}
          circleLoop={true}
        />
        <View style={styles.mTextView}>
          <Text style={styles.mText}>Categories</Text>
        </View>
        <View>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {items.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("Categories", { categoryKey: item.key })
                }
              >
                <View style={styles.itemContainer}>
                  <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                  </View>
                  <Text>{item.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View>
          <View style={styles.mTextView}>
            <Text style={styles.mText}>Trending</Text>
            <TouchableOpacity>
              <Text style={styles.sText}> See all</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView horizontal={true}>
          {Trending1.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.navigate("Info",{
                  item:item
                });
              }}
            >
              <Trendingcard
                image={item.images[0].baseUrl}
                name={item.name}
                price={item.price.value}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.mTextView}>
          <Text style={styles.mText}>New Collections</Text>
        </View>
        <View>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            horizontal={false}
          >
            {products.reduce((rows, item, index) => {
              if (index % 2 === 0) {
                rows.push(
                  <View style={styles.row} key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Info");
                      }}
                    >
                      <Newcollection
                        image={products[index].images[0].baseUrl}
                        name={products[index].name}
                        price={products[index].price.value}
                      />
                    </TouchableOpacity>
                    {index + 1 < products.length && (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Info");
                        }}
                      >
                        <Newcollection
                          image={products[index + 1].images[0].baseUrl}
                          name={products[index + 1].name}
                          price={products[index + 1].price.value}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }
              return rows;
            }, [])}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  topC: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topI: {
    height: 32,
    width: 202,
    marginTop: 40,
    marginLeft: "4%",
  },
  topI2: {
    height: 20,
    width: 20,
    marginTop: 45,
    marginRight: "4%",
  },
  carousel: {
    borderRadius: 16,
    height: 140,
    width: "90%",
    marginLeft: "5%",
    marginTop: 30,
  },
  mTextView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "7.2%",
    paddingTop: 8,
  },
  mText: {
    fontSize: 18,
    // fontWeight: "bold",
  },
  sText: {
    fontSize: 14,
    // fontWeight: "bold",
    marginLeft: "72%",
    marginTop: 9,
  },

  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 5,
  },
  itemContainer: {
    alignItems: "center",
    marginLeft: 20,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 50, // Make it a circle
  },
  imageContainer: {
    borderRadius: 50, // Make it a circle
    overflow: "hidden",
    elevation: 5, // Shadow on Android
    shadowColor: "black", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
});
