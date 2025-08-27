import { ScrollView, Text, View } from "react-native";
import { Calendar, Clock, CheckCircle, AlertCircle, XCircle, Users, ChevronRight, Eye } from "lucide-react-native";
import { demoData } from "@/data/demoData";
import { Button } from "@/components/ui";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  const navigateToAttendance = () => {
    router.push("/attendance");
  };

  const navigateToTimetable = () => {
    router.push("/timetable");
  };

  // Helper functions
  const getSubjectName = (subjectId: string) => {
    return demoData.subjects.find(s => s.id === subjectId)?.name || 'Unknown Subject';
  };

  const getTeacherName = (teacherId: string) => {
    return demoData.teachers.find(t => t.id === teacherId)?.name || 'Unknown Teacher';
  };

  const getRoomName = (roomId: string) => {
    return demoData.rooms.find(r => r.id === roomId)?.name || 'Unknown Room';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get today's classes
  const todaysClasses = demoData.classes.map(cls => ({
    ...cls,
    subjectName: getSubjectName(cls.subject_id),
    teacherName: getTeacherName(cls.teacher_id),
    roomName: getRoomName(cls.room_id),
    startTime: formatTime(cls.start_date),
    endTime: formatTime(cls.end_date)
  }));

  const now = new Date();
  const nextClass = todaysClasses.find(cls => new Date(cls.start_date) > now);

  // Calculate overall attendance stats
  const totalAttendance = demoData.attendance.length;
  const presentCount = demoData.attendance.filter(att => att.status === 'PRESENT').length;
  const lateCount = demoData.attendance.filter(att => att.status === 'LATE').length;
  const absentCount = demoData.attendance.filter(att => att.status === 'ABSENT').length;
  const attendancePercentage = Math.round(((presentCount + lateCount) / totalAttendance) * 100);


  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'PRESENT':
        return <CheckCircle size={16} color="#10B981" />;
      case 'LATE':
        return <AlertCircle size={16} color="#F59E0B" />;
      case 'ABSENT':
        return <XCircle size={16} color="#EF4444" />;
      default:
        return null;
    }
  };

  return (
    <ScrollView className="flex-1 bg-white pt-8">
      <View className="px-6 -mt-4">
        {/* Today's Summary Card */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="flex-row items-center mb-4">
            <Calendar size={24} color="#3B82F6" />
            <Text className="text-lg font-semibold text-gray-900 ml-2">Today's Summary</Text>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-900">{todaysClasses.length}</Text>
              <Text className="text-gray-600 text-sm">Classes Today</Text>
            </View>

            {nextClass && (
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Clock size={16} color="#10B981" />
                  <Text className="text-sm font-medium text-green-600 ml-1">Next Class</Text>
                </View>
                <Text className="text-sm font-semibold text-gray-900 mt-1">{nextClass.subjectName}</Text>
                <Text className="text-xs text-gray-500">{nextClass.startTime} - {nextClass.roomName}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Overall Attendance */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <Users size={24} color="#3B82F6" />
              <Text className="text-lg font-semibold text-gray-900 ml-2">Overall Attendance</Text>
            </View>
            <Button
              variant="link"
              size="sm"
              className="flex-row items-center"
              onPress={navigateToAttendance}
            >
              <Eye size={16} color="#6B7280" />
              <Text className="text-sm text-gray-600 ml-1">View Details</Text>
            </Button>
          </View>

          <View className="mb-4">
            <Text className="text-3xl font-bold text-gray-900">{attendancePercentage}%</Text>
            <Text className="text-gray-600 text-sm">Attendance Rate</Text>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <CheckCircle size={16} color="#10B981" />
              <Text className="text-sm text-gray-700 ml-1">{presentCount} Present</Text>
            </View>
            <View className="flex-row items-center">
              <AlertCircle size={16} color="#F59E0B" />
              <Text className="text-sm text-gray-700 ml-1">{lateCount} Late</Text>
            </View>
            <View className="flex-row items-center">
              <XCircle size={16} color="#EF4444" />
              <Text className="text-sm text-gray-700 ml-1">{absentCount} Absent</Text>
            </View>
          </View>
        </View>

        {/* Today's Classes */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">Today's Classes</Text>
            <Button
              variant="link"
              size="sm"
              className="flex-row items-center"
              onPress={navigateToTimetable}
            >
              <Text className="text-sm text-blue-600 mr-1">Full Schedule</Text>
              <ChevronRight size={16} color="#3B82F6" />
            </Button>
          </View>

          {todaysClasses.map((cls, index) => {
            // Get attendance status for this class (simplified - using first attendance record)
            const attendance = demoData.attendance.find(att => att.class_id === cls.id);

            return (
              <View key={cls.id} className={`${index !== todaysClasses.length - 1 ? 'border-b border-gray-100' : ''} pb-4 mb-4`}>
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-900">{cls.subjectName}</Text>
                    <Text className="text-sm text-gray-600 mt-1">{cls.teacherName}</Text>
                    <Text className="text-sm text-gray-500">{cls.roomName}</Text>
                  </View>

                  <View className="items-end">
                    <Text className="text-sm font-medium text-gray-900">{cls.startTime} - {cls.endTime}</Text>
                    {attendance && (
                      <View className="flex-row items-center mt-1">
                        <StatusIcon status={attendance.status} />
                        <Text className="text-xs text-gray-600 ml-1 capitalize">{attendance.status.toLowerCase()}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
