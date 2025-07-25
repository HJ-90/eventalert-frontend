import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export default function DashboardScreen() {
  const navigation = useNavigation();
  const [situations, setSituations] = useState([]);
  const getRelativeTime = (timeString: string) => {
    const time = new Date(timeString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000); // 초 단위

    if (diff < 60) return '방금 전';
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  useEffect(() => {
      const fetchSituations = async () => {
        try {
          const response = await axios.get('http://192.168.0.16:8080/situations');
          setSituations(response.data);
        } catch (error) {
          console.error('상황 목록 불러오기 실패:', error);
        }
      };

      fetchSituations();
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>상황 목록</Text>
       {situations.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>현재 등록된 상황이 없습니다.</Text>
            ) : (
      <FlatList
        data={situations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.status}</Text>
            <Text style={styles.time}>{getRelativeTime(item.time)}</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>조치 시작</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#ff5252' }]}>
                <Text style={[styles.actionText, { color: 'white' }]}>119 신고</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      )}
      <Button
        title="로그아웃"
        onPress={async () => {
            await AsyncStorage.removeItem('token');
            navigation.replace('Login');
        }}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  actionText: {
    fontWeight: 'bold',
  },
});
