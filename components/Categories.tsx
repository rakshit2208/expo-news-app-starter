import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import newsCategoryList from "@/constants/Categories";

type Props = {
    onCategoryChanged: (category: string) => void;
};

const Categories = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[]|null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);

        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x: x , y: 0, animated: true });
        })

        onCategoryChanged(newsCategoryList[index].slug);
    }

  return (
    <View>
      <Text style={styles.title}>Trending Right Now</Text>
      <ScrollView
      ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemsWrapper}
      >
        {newsCategoryList.map((item, index) => (
          <TouchableOpacity ref={(el) => (itemRef.current[index] = el)} key={index} style={[styles.item,activeIndex === index && styles.itemActive]}
          onPress={() => handleSelectCategory(index)}>
            <Text style={[styles.itemText,activeIndex === index && styles.itemTextActive]}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  itemsWrapper: {
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: Colors.darkGrey,
    borderWidth: 1,
  },
  itemActive: {
    backgroundColor: Colors.tint, 
    borderColor: Colors.tint 
  },
  itemText: {
    fontSize: 14,
    letterSpacing: 0.5,
    color: Colors.darkGrey,
  },
  itemTextActive: {
    fontWeight: "600",
    color: Colors.white
  }
});
