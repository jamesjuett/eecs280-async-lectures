#include <iostream>
#include <string>

using namespace std;

class Person {
private:
  string name;
public:

  Person(const string& name) : name(name) { }
  
  void draw(const string& object) {
    cout << name << " draws the " << object << " closer." << endl;
  }

  void draw(const string& subject, bool isArtistic) {
    if (isArtistic) {
       // Use a flag to differentiate
      cout << name << " is drawing a " << subject << "." << endl;
    }
  }

  void draw(const Person& opponent) {
    cout << name << " and " << opponent.name << "have reached a draw." << endl;
  }
};
