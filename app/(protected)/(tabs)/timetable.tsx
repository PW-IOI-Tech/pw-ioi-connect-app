import { View, Text, ScrollView } from "react-native";
import { demoData } from "@/data/demoData";
import { useMemo, useState } from "react";
import {
  Clock,
  MapPin,
  BookOpen,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react-native";
import { Button } from "@/components/ui";

export default function TimetablePage() {
  const [currentWeek, setCurrentWeek] = useState(0); // 0 = current week
  const [viewMode, setViewMode] = useState<"today" | "week">("week");

  // Helper functions
  const getWeekDates = (weekOffset = 0) => {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset + weekOffset * 7);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const istDate = new Date(date.getTime() + istOffset);
    return istDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getSubjectName = (subjectId: string) => {
    return (
      demoData.subjects.find((s) => s.id === subjectId)?.name ||
      "Unknown Subject"
    );
  };

  const getTeacherName = (teacherId: string) => {
    return (
      demoData.teachers.find((t) => t.id === teacherId)?.name ||
      "Unknown Teacher"
    );
  };

  const getRoomName = (roomId: string) => {
    return demoData.rooms.find((r) => r.id === roomId)?.name || "Unknown Room";
  };

  const getDivisionName = (divisionId: string) => {
    return (
      demoData.divisions.find((d) => d.id === divisionId)?.name ||
      "Unknown Division"
    );
  };

  // Get today's classes
  const todaysClasses = useMemo(() => {
    const today = new Date("2025-08-24"); // Using the demo date
    return demoData.classes
      .filter((cls) => {
        const classDate = new Date(cls.start_date);
        return classDate.toDateString() === today.toDateString();
      })
      .sort((a, b) => new Date(a.start_date).getDate() - new Date(b.start_date).getDate());
  }, []);

  // Get week's classes grouped by day
  const weekClassesByDay = useMemo(() => {
    const weekDates = getWeekDates(currentWeek);
    const classesByDay: { [key: string]: { date: Date; classes: any[] } } = {};

    weekDates.forEach((date) => {
      const dateStr = date.toDateString();
      classesByDay[dateStr] = {
        date: date,
        classes: demoData.classes
          .filter((cls) => {
            const classDate = new Date(cls.start_date);
            return classDate.toDateString() === dateStr;
          })
          .sort((a, b) => new Date(a.start_date).getDate() - new Date(b.start_date).getDate()),
      };
    });

    return classesByDay;
  }, [currentWeek]);

  // Get subject code (first letters or abbreviation)
  const getSubjectCode = (subjectId: string) => {
    const subject = demoData.subjects.find((s) => s.id === subjectId);
    if (!subject) return "UNK";

    // Create abbreviation from subject name
    const words = subject.name.split(/[\s&]+/);
    if (words.length === 1) {
      return words[0].substring(0, 3).toUpperCase();
    }
    return words
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  // Get room number (extract number from room name)
  const getRoomNumber = (roomId: string) => {
    const room = demoData.rooms.find((r) => r.id === roomId);
    if (!room) return "";

    // Extract number from room name (e.g., "Room 101" -> "101", "Lab 301" -> "301")
    const match = room.name.match(/\d+/);
    return match ? match[0] : room.name.substring(0, 3);
  };

  // Calculate week summary
  const weekSummary = useMemo(() => {
    const allWeekClasses = Object.values(weekClassesByDay).flatMap(
      (day) => day.classes
    );
    const totalClasses = allWeekClasses.length;
    const daysWithClasses = Object.values(weekClassesByDay).filter(
      (day) => day.classes.length > 0
    ).length;
    const avgClassesPerDay =
      daysWithClasses > 0 ? (totalClasses / daysWithClasses).toFixed(1) : 0;

    return {
      totalClasses,
      daysWithClasses,
      avgClassesPerDay,
    };
  }, [weekClassesByDay]);

  const DetailedClassCard = ({ classData }: { classData: any }) => {
    return (
      <View className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              {getSubjectName(classData.subject_id)}
            </Text>
            <Text className="text-sm text-gray-600 font-medium">
              {classData.lecture_number}
            </Text>
          </View>
          <View className="bg-blue-50 px-3 py-1 rounded-full">
            <Text className="text-sm font-medium text-blue-700">
              {getDivisionName(classData.division_id)}
            </Text>
          </View>
        </View>

        <View className="space-y-2">
          <View className="flex-row items-center">
            <Clock size={18} color="#6B7280" />
            <Text className="text-sm text-gray-700 ml-3 font-medium">
              {formatTime(classData.start_date)} -{" "}
              {formatTime(classData.end_date)}
            </Text>
          </View>

          <View className="flex-row items-center">
            <MapPin size={18} color="#6B7280" />
            <Text className="text-sm text-gray-700 ml-3">
              {getRoomName(classData.room_id)}
            </Text>
          </View>

          <View className="flex-row items-center">
            <BookOpen size={18} color="#6B7280" />
            <Text className="text-sm text-gray-700 ml-3">
              {getTeacherName(classData.teacher_id)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const ClassSlot = ({ classData }: { classData: any }) => (
    <View className="bg-blue-50 border border-blue-200 rounded-md p-2 mb-1 min-h-[50px] justify-center">
      <Text className="text-blue-900 font-semibold text-xs text-center">
        {getSubjectCode(classData.subject_id)}
      </Text>
      <Text className="text-blue-700 text-xs text-center mt-1">
        {getRoomNumber(classData.room_id)}
      </Text>
    </View>
  );

  const DayColumn = ({ dateStr, dayData }: { dateStr: string; dayData: any }) => {
    const dayName = dayData.date.toLocaleDateString("en-US", {
      weekday: "short",
    });
    const dayNumber = dayData.date.getDate();
    const isCurrentDay = isToday(dayData.date);

    return (
      <View className="flex-1 mx-1">
        {/* Day Header */}
        <View
          className={`items-center py-2 rounded-lg mb-2 ${
            isCurrentDay ? "bg-blue-100" : "bg-gray-50"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              isCurrentDay ? "text-blue-700" : "text-gray-600"
            }`}
          >
            {dayName}
          </Text>
          <Text
            className={`text-lg font-bold ${
              isCurrentDay ? "text-blue-900" : "text-gray-900"
            }`}
          >
            {dayNumber}
          </Text>
        </View>

        {/* Classes */}
        <View className="flex-1 min-w-24">
          {dayData.classes.length > 0 ? (
            dayData.classes.map((classData: any) => (
              <ClassSlot key={classData.id} classData={classData} />
            ))
          ) : (
            <View className="bg-gray-50 rounded-md p-2 min-h-[50px] justify-center items-center">
              <Text className="text-gray-400 text-xs">No classes</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const WeekCalendarView = () => {
    const weekDates = getWeekDates(currentWeek);

    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="flex-row min-w-full px-2">
            {weekDates.map((date) => {
              const dateStr = date.toDateString();
              return (
                <DayColumn
                  key={dateStr}
                  dateStr={dateStr}
                  dayData={weekClassesByDay[dateStr]}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  };

  const WeekSummaryCard = () => (
    <View className="bg-primary rounded-lg p-4 mb-4">
      <View className="flex-row items-center mb-3">
        <BarChart3 size={20} color="#FFFFFF" />
        <Text className="text-white font-semibold text-lg ml-2">
          Week Overview
        </Text>
      </View>

      <View className="flex-row justify-between">
        <View className="items-center">
          <Text className="text-white text-2xl font-bold">
            {weekSummary.totalClasses}
          </Text>
          <Text className="text-blue-100 text-xs">Total Classes</Text>
        </View>
        <View className="items-center">
          <Text className="text-white text-2xl font-bold">
            {weekSummary.daysWithClasses}
          </Text>
          <Text className="text-blue-100 text-xs">Active Days</Text>
        </View>
        <View className="items-center">
          <Text className="text-white text-2xl font-bold">
            {weekSummary.avgClassesPerDay}
          </Text>
          <Text className="text-blue-100 text-xs">Avg/Day</Text>
        </View>
      </View>
    </View>
  );

  const weekDates = getWeekDates(currentWeek);
  const weekStart = weekDates[0].toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
  const weekEnd = weekDates[6].toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  return (
    <View className="flex-1 pt-8 px-4">
      {/* Week Navigation */}
      <View className="flex-row items-center justify-between mb-4">
        <Button
          variant="ghost"
          onPress={() => setCurrentWeek(currentWeek - 1)}
          className="p-2 rounded-full bg-gray-100"
        >
          <ChevronLeft size={20} color="#374151" />
        </Button>

        <View className="items-center">
          <Text className="text-lg font-semibold text-gray-900">
            {weekStart} - {weekEnd}
          </Text>
          {currentWeek === 0 && (
            <Text className="text-sm text-blue-600 font-medium">
              Current Week
            </Text>
          )}
        </View>

        <Button
          variant="ghost"
          onPress={() => setCurrentWeek(currentWeek + 1)}
          className="p-2 rounded-full bg-gray-100"
        >
          <ChevronRight size={20} color="#374151" />
        </Button>
      </View>

      {/* Current Week Button */}
      {currentWeek !== 0 && (
        <Button
          onPress={() => setCurrentWeek(0)}
          className="bg-blue-500 rounded-lg py-2 px-4 mb-4 self-center"
        >
          <Text className="text-white font-medium">Go to Current Week</Text>
        </Button>
      )}

      {/* View Toggle */}
      <View className="flex-row bg-gray-100 rounded-lg p-1">
        <Button
          variant="ghost"
          onPress={() => setViewMode("today")}
          className={`flex-1 py-2 px-4 rounded-md ${
            viewMode === "today" ? "bg-white shadow-sm" : ""
          }`}
        >
          <Text
            className={`text-center font-medium ${
              viewMode === "today" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            Today's View
          </Text>
        </Button>

        <Button
          variant="ghost"
          onPress={() => setViewMode("week")}
          className={`flex-1 py-2 px-4 rounded-md ${
            viewMode === "week" ? "bg-white shadow-sm" : ""
          }`}
        >
          <Text
            className={`text-center font-medium ${
              viewMode === "week" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            Week View
          </Text>
        </Button>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 px-4 py-4"
        showsVerticalScrollIndicator={false}
      >
        {viewMode === "week" && <WeekSummaryCard />}

        {/* Today's View */}
        {viewMode === "today" && (
          <View>
            <View className="flex-row items-center mb-4">
              <Calendar size={20} color="#374151" />
              <Text className="text-lg font-semibold text-gray-900 ml-2">
                Today's Classes ({todaysClasses.length})
              </Text>
            </View>

            {todaysClasses.length > 0 ? (
              todaysClasses.map((classData) => (
                <DetailedClassCard key={classData.id} classData={classData} />
              ))
            ) : (
              <View className="bg-white rounded-lg p-8 items-center">
                <Calendar size={48} color="#9CA3AF" />
                <Text className="text-gray-500 text-lg font-medium mt-2">
                  No classes today
                </Text>
                <Text className="text-gray-400 text-center mt-1">
                  Enjoy your free day!
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Week View */}
        {viewMode === "week" && (
          <View>
            <View className="flex-row items-center mb-4">
              <Calendar size={20} color="#374151" />
              <Text className="text-lg font-semibold text-gray-900 ml-2">
                Weekly Schedule
              </Text>
            </View>

            <WeekCalendarView />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
