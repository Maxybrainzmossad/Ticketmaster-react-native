import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Image } from 'react-native'
import ThemedItemBox from '../../components/ThemedItemBox'
import ThemedTicketItem from '../../components/ThemedTicketItem'
import Spacer from '../../components/Spacer'

const event = () => {
    const handleClick = () => {
        //id should be pass as a key

        console.log('clicked successfully');
    }

  return (
    <ScrollView 
        style={styles.container}
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
    >
        <ThemedTicketItem
            event={handleClick}
        >
            <Image 
                source={{uri: 'https://imgs.search.brave.com/rHWNkE1VUjRhIk8oo4jQmwI2ZTrhc8VTh2xDelsssb8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E4LzA3/LzhjL2E4MDc4Yzdk/Y2Q5ZmE3OGE5N2Jm/MTk0ZDNkZTlmNGQz/LmpwZw'}} 
                style={{ width: "100%", height: 220, position: 'absolute', top: 0 }}
            />
            <ThemedItemBox>
                <View style={{backgroundColor: '#000', width: 150, height: 40}}>
                    <Text 
                        style={{
                            color: '#fff', textAlign: 'center', lineHeight: 40, fontWeight: '800', fontSize: 12
                        }}
                    >
                        sat, sep 6, 2025 - 6:10pm
                    </Text>
                </View>
                <View style={{backgroundColor: '#000', width: '100%', height: 170}}>
                    <Text 
                        style={{
                            color: '#fff', textAlign: 'left', lineHeight: 40, fontWeight: '800', fontSize: 22, textTransform: 'uppercase', paddingTop: 20, paddingLeft: 20, paddingRight: 30
                        }}
                    >
                        Coldplay: music of the spheres world tour 2025-delivered by dhl
                    </Text>
                    <Spacer height={8}/>
                    <Text style={{width: 140, height: 2, backgroundColor: '#fff', marginLeft: 20 }}></Text>
                    <Spacer height={20}/>
                    <Text 
                        style={{
                            color: '#fff', textAlign: 'left', fontWeight: '800', fontSize: 12, textTransform: 'uppercase', paddingLeft: 20, paddingRight: 30
                        }}
                    >
                        wesley motelhall
                    </Text>
                </View>
            </ThemedItemBox>
        </ThemedTicketItem>

        <ThemedTicketItem
            event={handleClick}
        >
            <Image 
                source={{uri: 'https://imgs.search.brave.com/Q3WmYwIlEiZ7P4h2n-xu3u02a-y08zN07v_DtZNkjws/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi92aWV3/LW91dGRvb3ItY29u/Y2VydC1zdGFnZS1z/ZXR1cC1saWdodGlu/Zy1mb2ctbWFjaGlu/ZXMtZW1wdHktcmVh/ZHktcGVyZm9ybWFu/Y2Utc2t5LXBpbmst/cHVycGxlLWNsb3Vk/cy0zMjI2NTQyOTMu/anBn'}} 
                style={{ width: "100%", height: 220, position: 'absolute', top: 0 }}
            />
            <ThemedItemBox>
                <View style={{backgroundColor: '#000', width: 150, height: 40}}>
                    <Text 
                        style={{
                            color: '#fff', textAlign: 'center', lineHeight: 40, fontWeight: '800', fontSize: 12
                        }}
                    >
                        sat, sep 6, 2025 - 6:10pm
                    </Text>
                </View>
                <View style={{backgroundColor: '#000', width: '100%', height: 170}}>
                    <Text 
                        style={{
                            color: '#fff', textAlign: 'left', lineHeight: 40, fontWeight: '800', fontSize: 22, textTransform: 'uppercase', paddingTop: 20, paddingLeft: 20, paddingRight: 30
                        }}
                    >
                        Coldplay: music of the spheres world tour 2025-delivered by dhl
                    </Text>
                    <Spacer height={8}/>
                    <Text style={{width: 140, height: 2, backgroundColor: '#fff', marginLeft: 20 }}></Text>
                    <Spacer height={20}/>
                    <Text 
                        style={{
                            color: '#fff', textAlign: 'left', fontWeight: '800', fontSize: 12, textTransform: 'uppercase', paddingLeft: 20, paddingRight: 30
                        }}
                    >
                        wesley motelhall
                    </Text>
                </View>
            </ThemedItemBox>
        </ThemedTicketItem>

        <ThemedTicketItem
            event={handleClick}
        >
            <Image 
                source={{uri: 'https://imgs.search.brave.com/dFXiDeSk-ecfAX1SOSnyIYZJ044pIwTVHnPzmQBIv9M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by8zZC1ldmVudC1l/bnRlcnRhaW5tZW50/LWNvbmNlcHQtc3Rh/Z2UtbGlnaHRzLWNv/bmNlcnQtbXVzaWMt/ZmVzdGl2YWxfMTAy/OTQ3My03NTE1NTAu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw'}} 
                style={{ width: "100%", height: 220, position: 'absolute', top: 0 }}
            />
            <ThemedItemBox>
                <View style={{backgroundColor: '#000', width: 150, height: 40}}>
                    <Text 
                        style={{
                            color: '#fff', textAlign: 'center', lineHeight: 40, fontWeight: '800', fontSize: 12
                        }}
                    >
                        sat, sep 6, 2025 - 6:10pm
                    </Text>
                </View>
                <View style={{backgroundColor: '#000', width: '100%', height: 170}}>
                    <Text 
                        style={{
                            color: '#fff', textAlign: 'left', lineHeight: 40, fontWeight: '800', fontSize: 22, textTransform: 'uppercase', paddingTop: 20, paddingLeft: 20, paddingRight: 30
                        }}
                    >
                        Coldplay: music of the spheres world tour 2025-delivered by dhl
                    </Text>
                    <Spacer height={8}/>
                    <Text style={{width: 140, height: 2, backgroundColor: '#fff', marginLeft: 20 }}></Text>
                    <Spacer height={20}/>
                    <Text 
                        style={{
                            color: '#fff', textAlign: 'left', fontWeight: '800', fontSize: 12, textTransform: 'uppercase', paddingLeft: 20, paddingRight: 30
                        }}
                    >
                        wesley motelhall
                    </Text>
                </View>
            </ThemedItemBox>
        </ThemedTicketItem>

        <ThemedTicketItem
            event={handleClick}
        >
            <Image 
                source={{uri: 'https://imgs.search.brave.com/b-Ru--ywxS3gxZE_tFxbZsCtjyHYuPEqYkGOPMwQ5GM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzA3LzgzLzQy/LzM2MF9GXzEwNzgz/NDI2Ml9pQWY3R1VB/dTh4ZEhOWVYwNUla/dmVwUmtMTnQ2MXdS/YS5qcGc'}} 
                style={{ width: "100%", height: 220, position: 'absolute', top: 0 }}
            />
            <ThemedItemBox>
                <View style={{backgroundColor: '#000', width: 150, height: 40}}>
                    <Text 
                        style={{
                            color: '#fff', textAlign: 'center', lineHeight: 40, fontWeight: '800', fontSize: 12
                        }}
                    >
                        sat, sep 6, 2025 - 6:10pm
                    </Text>
                </View>
                <View style={{backgroundColor: '#000', width: '100%', height: 170}}>
                    <Text 
                        style={{
                            color: '#fff', textAlign: 'left', lineHeight: 40, fontWeight: '800', fontSize: 22, textTransform: 'uppercase', paddingTop: 20, paddingLeft: 20, paddingRight: 30
                        }}
                    >
                        Coldplay: music of the spheres world tour 2025-delivered by dhl
                    </Text>
                    <Spacer height={8}/>
                    <Text style={{width: 140, height: 2, backgroundColor: '#fff', marginLeft: 20 }}></Text>
                    <Spacer height={20}/>
                    <Text 
                        style={{
                            color: '#fff', textAlign: 'left', fontWeight: '800', fontSize: 12, textTransform: 'uppercase', paddingLeft: 20, paddingRight: 30
                        }}
                    >
                        wesley motelhall
                    </Text>
                </View>
            </ThemedItemBox>
        </ThemedTicketItem>
    </ScrollView>
  )
}

export default event

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },

})