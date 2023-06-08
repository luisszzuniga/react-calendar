import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';

const IDs = {
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item'
  }
};

const AgendaScreen = ({ teamId }) => {
  if (! teamId) {
    return (
      <Text>Rejoignez une équipe</Text>
    );
  }

  const [items, setItems] = useState(undefined);

  useEffect(() => {
    loadItems({ dateString: todayDateString() });
  }, [teamId]);

  const loadItems = async (month) => {
    // CETTE FONCTION DE CALLBACK EST APELLÉE POUR TOUS LES MOIS.
    // A PARTIR DE MONTH.DATESTRING RECUPERER LA DATE DU DEBUT DU MOIS ET DE FIN DU MOIS
    // FAIRE REQUETE DES RESERVATIONS FAITES ENTRE CES DEUX DATES PUIS LES METTRE DANS LES ITEMS
    // MOMENT JS?

    const newItems = {};

    if (!newItems[month.dateString]) {
      newItems[month.dateString] = [];

      const numItems = Math.floor(Math.random() * 3 + 1);
      for (let j = 0; j < numItems; j++) {
        newItems[month.dateString].push({
          name: 'Item for ' + month.dateString + ' #' + j,
          height: Math.max(50, Math.floor(Math.random() * 150)),
          day: month.dateString
        });
      }
    }

    setItems(newItems);
  }

  const renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        testID={IDs.agenda.ITEM}
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  }

  const todayDateString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  return (
    <Agenda
      testID={IDs.agenda.CONTAINER}
      items={items}
      loadItemsForMonth={loadItems}
      selected={todayDateString()}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      showClosingKnob={true}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

export default AgendaScreen;
