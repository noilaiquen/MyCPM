import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { locationsFinder } from './../../Storage/LocationHelper';

export const ProvinceList = props => (
   <FlatList
      data={locationsFinder()}
      keyExtractor={(item) => item.province_id}
      renderItem={({ item, i }) => (
         <TouchableOpacity
            key={i}
            style={styles.listItem}
            onPress={() => props.onSelectItem(item)}
         >
            <Text style={styles.listItemLabel}>{item.province_name}</Text>
         </TouchableOpacity>
      )}
   />
);

export const DistrictList = props => (
   <FlatList
      data={locationsFinder('district', props.parentId)}
      keyExtractor={(item) => item.district_id}
      renderItem={({ item, i }) => (
         <TouchableOpacity
            key={i}
            style={styles.listItem}
            onPress={() => props.onSelectItem(item)}
         > 
            <Text style={styles.listItemLabel}>{item.district_name}</Text>
         </TouchableOpacity>
      )}
   />
);

export const WardList = props => (
   <FlatList
      data={locationsFinder('ward', props.parentId)}
      keyExtractor={(item) => item.ward_id}
      renderItem={({ item, i }) => (
         <TouchableOpacity
            key={i}
            style={styles.listItem}
            onPress={() => props.onSelectItem(item)}
         > 
            <Text style={styles.listItemLabel}>{item.ward_name}</Text>
         </TouchableOpacity>
      )}
   />
);
